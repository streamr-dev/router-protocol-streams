import { gql } from 'graphql-request';

export const query = gql`
  query getLatestCrosschainTransactions(
    $limit: Int!
    $offset: Int!
    $timestamp: Int!
  ) {
    paginatedCrosschain(
      filter: { createdAt: { gte: $timestamp } }
      sortBy: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      totalRecords
      crosschains {
        id
        blockHeight
        attestationId
        srcChainId
        srcTimestamp
        sourceTxHash
        srcTxOrigin
        requestSender
        requestPacket {
          handler
          payload
        }
        requestMetadata {
          destGasLimit
        }
        destChainId
        destinationTxHash
        execStatus
        execData
        status
        historyStatus {
          status
          txnHash
          timestamp
        }
        destTxFeeInRoute
        refundFeeInRoute
        relayerFeeInRoute
        updatedAt
        createdAt
      }
    }
  }
`;
