
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

import { GrpcPreownedClient } from '@/lib/grpc';

import { SSR_API_DOMAIN } from './constants';

export const grpcClient = new GrpcPreownedClient(SSR_API_DOMAIN, {
  transport: NodeHttpTransport(),
  debug: process?.env?.NODE_ENV === 'development',
});
