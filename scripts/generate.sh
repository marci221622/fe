mkdir gen
cd gen
git clone -b master git@gitlab.int.tsum.com:preowned/contracts/proto.git
cd ../

rm -r src/generated

mkdir src/generated

protoc \
--plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./src/generated \
--ts_proto_opt=outputClientImpl=grpc-web \
--ts_proto_opt=esModuleInterop=true \
--ts_proto_opt=forceLong=string \
--proto_path=./gen/proto ./gen/proto/customer_hub/customer-hub-service.proto ./gen/proto/common/*.proto

sudo rm -r gen
