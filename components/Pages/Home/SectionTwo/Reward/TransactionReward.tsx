import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Address, formatUnits } from 'viem';
import { format } from 'date-fns';

import { shortenAddress } from '@/utils/string';
import {
  CAMPAIGN_TYPE,
  CONTRACT_BITGET_ADDRESS,
  CONTRACT_PUBLIC_ADDRESS,
  U2U_SCAN_URL,
} from '@/config/env';
import { toNumberNoRound } from '@/utils';
import { subgraphService } from '@/services/subgraph';
import { TransactionReward as ITransactionReward } from '@/types/subgraph.response';

export default function TransactionReward() {
  // const [queryParams, setQueryParams] = useState<APIParams.Pagination>({
  //   page: 1,
  //   size: 5,
  // });
  const [transactions, setTransactions] = useState<ITransactionReward[]>([]);
  const { address } = useAccount();

  const fetchData = async () => {
    if (!address) return;
    const { data } = await subgraphService.getGetTransactionReward(
      address?.toLowerCase() as Address,
      CAMPAIGN_TYPE.toLowerCase() === 'public'
        ? (CONTRACT_PUBLIC_ADDRESS.toLowerCase() as Address)
        : (CONTRACT_BITGET_ADDRESS.toLowerCase() as Address),
    );
    setTransactions(data?.transactionPools || []);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // mutate();
      fetchData().then();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [address]);

  useEffect(() => {
    fetchData().then();
  }, [address]);

  return (
    <>
      <div className="flex justify-center gap-6 laptop:gap-4 flex-col w-full">
        <h3 className="font-jockey text-2xl">Reward Transactions</h3>
        <div className="p-5 laptop:p-8 flex justify-center flex-col w-full gap-6 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
          <div className="h-[300px] w-full overflow-y-scroll">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-[#929292]">
                  <th className="text-left w-1/3">Timestamp</th>
                  <th className="text-left laptop:text-center w-1/3">Amount</th>
                  <th className="text-left laptop:text-right w-1/3">TxHash</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.length
                  ? transactions?.map((transaction, index) => (
                      <tr key={index}>
                        <td className="py-4 pr-4 laptop:pr-0 text-base laptop:text-lg border-b border-[#4a4a4a80] ...">
                          {format(
                            new Date(1000 * Number(transaction.timestamp)),
                            'yyyy-MM-dd HH:mm:ss',
                          )}
                        </td>
                        <td className="py-4 pr-4 laptop:pr-0 text-left laptop:text-center text-base laptop:text-lg border-b border-[#4a4a4a80] ...">
                          {toNumberNoRound(
                            Number(
                              formatUnits(
                                BigInt(Number(transaction.amount) || 0),
                                18,
                              ),
                            ),
                            3,
                          )}{' '}
                          U2U
                        </td>
                        <td className="cursor-pointer text-left laptop:text-right py-4 pr-4 laptop:pr-0 text-base laptop:text-lg border-b border-[#4a4a4a80] ...">
                          <a
                            target="_blank"
                            href={`${U2U_SCAN_URL}/${transaction.txHash}`}
                          >
                            {shortenAddress(transaction.txHash)}
                          </a>
                        </td>
                      </tr>
                    ))
                  : ''}
              </tbody>
            </table>
            {!transactions?.length && (
              <div className="flex justify-center items-center h-full w-full">
                <p className="text-[#929292]">No transaction found</p>
              </div>
            )}
          </div>
          {/*<div className="h-full w-full flex items-end justify-center mt-6">*/}
          {/*  <ReactPaginate*/}
          {/*    forcePage={queryParams.page - 1}*/}
          {/*    pageCount={4}*/}
          {/*    pageRangeDisplayed={2}*/}
          {/*    marginPagesDisplayed={3}*/}
          {/*    renderOnZeroPageCount={null}*/}
          {/*    onPageChange={(data) => {*/}
          {/*      setQueryParams({*/}
          {/*        ...queryParams,*/}
          {/*        page: data.selected + 1,*/}
          {/*      });*/}
          {/*    }}*/}
          {/*    // ----*/}
          {/*    previousLabel={*/}
          {/*      <div*/}
          {/*        className={classNames(*/}
          {/*          'cursor-pointer rounded-l-lg bg-[#1F1F1F] border-r border-r-[#1F1F1F] p-[9px] hover:bg-gray-200',*/}

          {/*          'group-[.disabled]:cursor-not-allowed',*/}
          {/*        )}*/}
          {/*      >*/}
          {/*        <ArrowLeftIcon*/}
          {/*          width={24}*/}
          {/*          height={24}*/}
          {/*          className="fill-[#292D32]"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*    breakLabel="..."*/}
          {/*    nextLabel={*/}
          {/*      <div*/}
          {/*        className={classNames(*/}
          {/*          'cursor-pointer rounded-r-lg bg-[#1F1F1F] border-l border-l-[#1F1F1F] p-[9px] hover:bg-gray-200',*/}
          {/*          'group-[.disabled]:cursor-not-allowed',*/}
          {/*        )}*/}
          {/*      >*/}
          {/*        <ArrowLeftIcon*/}
          {/*          width={24}*/}
          {/*          height={24}*/}
          {/*          className="fill-[#292D32] rotate-180"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*    // ----*/}
          {/*    containerClassName="flex flex-row items-center justify-center rounded-lg bg-[#1F1F1F]"*/}
          {/*    previousClassName="group"*/}
          {/*    breakLinkClassName={classNames(*/}
          {/*      'rounded-lg text-gray-500 hover:text-indigo-500 p-[9px] transition-all duration-300',*/}
          {/*    )}*/}
          {/*    nextClassName="group"*/}
          {/*    pageLinkClassName={classNames(*/}
          {/*      'rounded-lg text-gray-500 hover:text-indigo-500 hover:bg-gray-200 p-[9px] transition-all duration-300',*/}
          {/*    )}*/}
          {/*    activeLinkClassName="!text-[#7EFFC5] font-normal"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
}
