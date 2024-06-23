import { RpcProvider, hash, num, shortString } from 'starknet';
const providerRPC = new RpcProvider({
  nodeUrl: 'http://localhost:5050',
}); // for an Infura node on Testnet

const myContractAddress = '0xb4079627ebab1cd3cf9fd075dda1ad2454a7a448bf659591f259efa2519b18';
const lastBlock = await providerRPC.getBlock('latest');
const keyFilter = [num.toHex(hash.starknetKeccak('Moved'))];
const eventsRes = await providerRPC.getEvents({
  address: myContractAddress,
  from_block: { block_number: lastBlock.block_number - 50 },
  to_block: { block_number: lastBlock.block_number },
  keys: [keyFilter],
  chunk_size: 10,
});

console.log(eventsRes)

const nbEvents = eventsRes.events.length;

for (let i = 0; i < nbEvents; i++) {
  const event = eventsRes.events[i];
  // console.log(
  //   'event #',
  //   i,
  //   'data length =',
  //   event.data.length,
  //   'key length =',
  //   event.keys.length,
  //   ':'
  // );
  console.log('\nkeys =', event.keys, 'data =', event.data);


  for (let i = 0; i < event.keys.length; i++) {
      const k = event.keys[i];
      //const val = shortString.decodeShortString(k);
      
      if(i==0){
        const val = bin2string(k);
        console.log(val)
      }else{
        const val = num.hexToBytes(k);
        console.log(bin2string(val))
      }

  }

  const nameHash = num.toHex(hash.starknetKeccak('Moved'));
  console.log(nameHash);
  
}

function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}