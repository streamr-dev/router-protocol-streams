import { request } from 'graphql-request';
import cron from 'node-cron';
import { RouterQueryResponse } from '../types';
import { query } from '../query';
import StreamrClient from 'streamr-client';

const ENDPOINT_URL = process.env.ENDPOINT_URL!;

const getLatestCrosschainTransactions = async (
  limit: number,
  offset: number,
  timestamp: number
): Promise<RouterQueryResponse | undefined> => {
  try {
    const data = await request<RouterQueryResponse | undefined>(
      ENDPOINT_URL,
      query,
      {
        limit,
        offset,
        timestamp,
      }
    );

    return data;
  } catch (error) {
    console.error('Error fetching blockchain data: ', error);
  }
};

export const startRouterService = async () => {
  let lastTimestamp = Math.floor(Date.now() / 1000);
  const streamr = new StreamrClient({
    auth: {
      privateKey: process.env.PRIVATE_KEY!,
    },
  });

  // Schedule the cron job to run every minute
  cron.schedule('* * * * *', async () => {
    console.log(
      'Running cron job to fetch transaction data for timestamp:',
      lastTimestamp
    );
    const data = await getLatestCrosschainTransactions(5000, 0, lastTimestamp);
    console.log('Total records found:', data?.paginatedCrosschain.totalRecords);

    if (data && data.paginatedCrosschain.totalRecords > 0) {
      const createdAt = data?.paginatedCrosschain.crosschains[0].createdAt;
      if (createdAt) {
        lastTimestamp = createdAt + 1;
      }
      for (const crosschainData of data.paginatedCrosschain.crosschains) {
        await streamr.publish(process.env.ROUTER_STREAM_ID!, crosschainData);
      }
      console.log(
        'published data points:',
        data.paginatedCrosschain.totalRecords
      );
    }
  });
};
