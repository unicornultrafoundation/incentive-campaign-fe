import {
  Abi,
  AbiFunction,
  AbiParametersToPrimitiveTypes,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype';
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from '@wagmi/core';
import { TransactionReceipt } from 'viem';
import { config as wagmiConfig } from '../config/wagmi';

async function write<
  abi extends Abi,
  functionName extends ExtractAbiFunctionNames<abi, 'payable' | 'nonpayable'>,
  abiFunction extends AbiFunction = ExtractAbiFunction<abi, functionName>,
>(config: {
  abi: abi;
  address: Address;
  functionName:
    | functionName
    | ExtractAbiFunctionNames<abi, 'payable' | 'nonpayable'>;
  value?: bigint;
  args: AbiParametersToPrimitiveTypes<abiFunction['inputs'], 'inputs'>;
}): Promise<TransactionReceipt> {
  try {
    const { address, abi, functionName, args, value } = config;
    const txHash = await writeContract(wagmiConfig, {
      address,
      abi: abi as any,
      functionName,
      args: args as any,
      value,
    });
    const response = await waitForTransactionReceipt(wagmiConfig, {
      hash: txHash,
    });
    return response;
  } catch (err: any) {
    throw new Error(err.toString());
  }
}

export const Web3Functions = {
  writeContract: write,
};
