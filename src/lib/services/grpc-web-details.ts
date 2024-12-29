import { toByteArray } from 'base64-js';
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import { Status } from 'grpc-web-error-details/dist/lib//status_pb';
import _m0 from 'protobufjs/minimal';

import * as ErrorDetailsPb from '@/generated/common/error_details.v1';

export type ErrorDetails =
  | ErrorDetailsPb.RetryInfo
  | ErrorDetailsPb.DebugInfo
  | ErrorDetailsPb.QuotaFailure
  | ErrorDetailsPb.ErrorInfo
  | ErrorDetailsPb.PreconditionFailure
  | ErrorDetailsPb.BadRequest
  | ErrorDetailsPb.RequestInfo
  | ErrorDetailsPb.ResourceInfo
  | ErrorDetailsPb.Help
  | ErrorDetailsPb.LocalizedMessage;

export type GrpcErrorDetails = [Status, ErrorDetails[]] | [null, null];

/**
 * Add paddings to a base64 string to make it valid
 * @param unpadded Base64 string without paddings
 * @returns Padded base64 string
 */
export function pad(unpadded: string): string {
  while (unpadded.length % 4 !== 0) {
    unpadded += '=';
  }
  return unpadded;
}

// Тип не смог достать нормально
const mapTypeUrlToErrorDetailClass = new Map<string, any>([
  ['type.googleapis.com/utp.common.error_details.v1.RetryInfo', ErrorDetailsPb.RetryInfo],
  ['type.googleapis.com/utp.common.error_details.v1.DebugInfo', ErrorDetailsPb.DebugInfo],
  ['type.googleapis.com/utp.common.error_details.v1.QuotaFailure', ErrorDetailsPb.QuotaFailure],
  ['type.googleapis.com/utp.common.error_details.v1.ErrorInfo', ErrorDetailsPb.ErrorInfo],
  ['type.googleapis.com/utp.common.error_details.v1.PreconditionFailure', ErrorDetailsPb.PreconditionFailure],
  ['type.googleapis.com/utp.common.error_details.v1.BadRequest', ErrorDetailsPb.BadRequest],
  ['type.googleapis.com/utp.common.error_details.v1.RequestInfo', ErrorDetailsPb.RequestInfo],
  ['type.googleapis.com/utp.common.error_details.v1.ResourceInfo', ErrorDetailsPb.ResourceInfo],
  ['type.googleapis.com/utp.common.error_details.v1.Help', ErrorDetailsPb.Help],
  ['type.googleapis.com/utp.common.error_details.v1.LocalizedMessage', ErrorDetailsPb.LocalizedMessage],
]);

function byteArrayFromString(str: string): Uint8Array {
  return toByteArray(pad(str));
}

export function statusFromError(err: any | { metadata: { 'grpc-status-details-bin'?: string } }): GrpcErrorDetails {
  // to get status, we requires err['metadata']['grpc-status-details-bin']
  if (typeof err?.metadata?.headersMap['grpc-status-details-bin']?.[0] === 'undefined') {
    // if the error does not contain status, return null
    return [null, null];
  }

  const statusDetailsBinStr = err?.metadata?.headersMap['grpc-status-details-bin'][0];

  let bytes: Uint8Array;

  try {
    bytes = byteArrayFromString(statusDetailsBinStr);
  } catch {
    // `grpc-status-details-bin` has an invalid base64 string
    return [null, null];
  }

  const st = Status.deserializeBinary(bytes);

  let details = [];

  try {
    details = st
      .getDetailsList()
      .map(details => parseErrorDetails(details))
      .filter((details): details is ErrorDetails => !!details);
  } catch (err) {
    return [null, null];
  }

  return [st, details];
}

function parseErrorDetails(details: Any): ErrorDetails | null {
  const typeUrl = details.getTypeUrl();
  const errorDetailsClass = mapTypeUrlToErrorDetailClass.get(typeUrl);

  if (!errorDetailsClass) {
    console.warn(`grpc-web-error-details: typeUrl "${typeUrl}" is not supported`);
    return null;
  }

  // Нету нормальных способов сделать десериализацию
  // ДЖобавил костыль во круг либы grpc-web-error-details
  // @ts-ignore
  return (errorDetailsClass.deserializeBinary ?? errorDetailsClass.decode)(details.getValue_asU8());
}
