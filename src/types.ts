interface RequestPacket {
  handler: string;
  payload: string;
}

interface RequestMetadata {
  destGasLimit: number;
}

interface HistoryStatus {
  status: string;
  txnHash: string;
  timestamp: number;
}

interface Crosschain {
  id: string;
  blockHeight: number;
  attestationId: string;
  srcChainId: string;
  srcTimestamp: number;
  sourceTxHash: string;
  srcTxOrigin: string;
  requestSender: string;
  requestPacket: RequestPacket;
  requestMetadata: RequestMetadata;
  destChainId: string;
  destinationTxHash: string;
  execStatus: string;
  execData: string;
  status: string;
  historyStatus: HistoryStatus;
  destTxFeeInRoute: number;
  refundFeeInRoute: number;
  relayerFeeInRoute: number;
  updatedAt: number;
  createdAt: number;
}

interface PaginatedCrosschain {
  totalRecords: number;
  crosschains: Crosschain[];
}

export interface RouterQueryResponse {
  paginatedCrosschain: PaginatedCrosschain;
}
