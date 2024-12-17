import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Address, formatUnits } from 'viem';
import { format } from 'date-fns';

// import { useGetTransactionStake } from '@/hooks/useQueryApi';
import { classNames, shortenAddress } from '@/utils/string';
import {
  CAMPAIGN_TYPE,
  CONTRACT_BITGET_ADDRESS,
  CONTRACT_BITGET_V2_ADDRESS,
  CONTRACT_PUBLIC_ADDRESS,
  CONTRACT_PUBLIC_V2_ADDRESS,
  U2U_SCAN_URL,
} from '@/config/env';
import { toNumberNoRound } from '@/utils';
import { subgraphService } from '@/services/subgraph';
import { TransactionReward } from '@/types/subgraph.response';

export default function TransactionStake() {
  // const [queryParams, setQueryParams] = useState<APIParams.Pagination>({
  //   page: 1,
  //   size: 5,
  // });
  const [transactions, setTransactions] = useState<TransactionReward[]>([]);
  const { address } = useAccount();

  const fetchData = async () => {
    if (!address) return;
    const { data } = await subgraphService.getGetTransactionStake(
      address?.toLowerCase() as Address,
      CAMPAIGN_TYPE.toLowerCase() === 'public'
        ? [
            CONTRACT_PUBLIC_ADDRESS.toLowerCase() as Address,
            CONTRACT_PUBLIC_V2_ADDRESS.toLowerCase() as Address,
          ]
        : [
            CONTRACT_BITGET_ADDRESS.toLowerCase() as Address,
            CONTRACT_BITGET_V2_ADDRESS.toLowerCase() as Address,
          ],
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
        <h3 className="font-jockey text-2xl">Transactions</h3>
        <div className="hidden laptop:flex overflow-auto relative p-5 laptop:p-8 justify-center flex-col w-full gap-6 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
          <div className="h-[300px] w-full flex flex-col justify-between items-center">
            <table className="border-collapse w-full table-auto">
              <thead className="sticky -top-[32px] rounded-xl">
                <tr className="text-[#929292] bg-[#1F1F1F] *:py-4">
                  <th className="pl-2 text-left w-1/3">Timestamp</th>
                  <th className="text-left laptop:text-center w-1/3">Amount</th>
                  <th className="pr-2 text-left laptop:text-right w-1/3">
                    TxHash
                  </th>
                </tr>
              </thead>
              <tbody className="h-full">
                {transactions?.length
                  ? transactions?.map((transaction, index) => (
                      <tr key={index}>
                        <td className="py-4 pr-4 laptop:px-2 text-base laptop:text-lg border-b border-[#4a4a4a80] ...">
                          {format(
                            new Date(1000 * Number(transaction.timestamp)),
                            'yyyy-MM-dd HH:mm:ss',
                          )}
                        </td>
                        <td className="py-4 pr-4 laptop:px-2 text-left laptop:text-center text-base laptop:text-lg border-b border-[#4a4a4a80] ...">
                          {toNumberNoRound(
                            Number(
                              formatUnits(
                                BigInt(Number(transaction.amount) || 0),
                                6,
                              ),
                            ),
                            3,
                          )}{' '}
                          $pUSDT
                        </td>
                        <td className="cursor-pointer text-left laptop:text-right py-4 pr-4 laptop:px-2 text-base laptop:text-lg border-b border-[#4a4a4a80] ...">
                          <div className="flex items-center justify-end gap-1">
                            <a
                              className="underline"
                              target="_blank"
                              href={`${U2U_SCAN_URL}/${transaction.txHash}`}
                            >
                              {shortenAddress(transaction.txHash)}
                            </a>
                            {/*<Icon.ArrowRightIcon className="size-7 text-white" />*/}
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
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
        <div className="flex tablet:hidden flex-col items-center w-full gap-6 overflow-auto">
          {transactions &&
            transactions.length > 0 &&
            transactions.map((transaction, index) => {
              return (
                <div
                  key={`mobile-${index}`}
                  className={classNames(
                    'flex flex-col items-center justify-center gap-4 w-full',
                    'rounded-2xl bg-[#141414] p-5',
                  )}
                >
                  {/* Type */}

                  {/* Node Type */}
                  <div className="flex flex-row items-center justify-between gap-4 w-full">
                    <div className="font-roboto font-normal text-sm text-[#929292]">
                      Timestamp
                    </div>
                    <div className="flex flex-row items-center justify-start font-inter font-bold text-base text-[#FFF]">
                      {format(
                        new Date(1000 * Number(transaction.timestamp)),
                        'yyyy-MM-dd HH:mm:ss',
                      )}
                    </div>
                  </div>

                  {/* Qty */}
                  <div className="flex flex-row items-center justify-between gap-4 w-full">
                    <div className="font-roboto font-normal text-sm text-[#929292]">
                      Amount
                    </div>
                    <div className="flex flex-row items-center justify-start font-inter font-bold text-base text-[#FFF]">
                      {toNumberNoRound(
                        Number(
                          formatUnits(
                            BigInt(Number(transaction.amount) || 0),
                            6,
                          ),
                        ),
                        3,
                      )}{' '}
                      $pUSDT
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 w-full">
                    <div className="font-roboto font-normal text-sm text-[#929292]">
                      TxHash
                    </div>
                    <div className="flex flex-row items-center justify-start font-inter font-bold text-base text-[#FFF]">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          className="underline"
                          target="_blank"
                          href={`${U2U_SCAN_URL}/${transaction.txHash}`}
                        >
                          {shortenAddress(transaction.txHash)}
                        </a>
                        {/*<Icon.ArrowRightIcon className="size-7 text-white" />*/}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {transactions?.length === 0 && (
            <div className="w-full flex py-20 justify-center h-full uppercase">
              <p>No Data</p>
            </div>
          )}

          {/*<div className="mt-4 pb-6">*/}
          {/*  <ReactPaginate*/}
          {/*    forcePage={queryParams.page - 1}*/}
          {/*    pageCount={Math.ceil(*/}
          {/*      (queryListOrder?.data?.data?.total ?? 1) / queryParams.limit,*/}
          {/*    )}*/}
          {/*    pageRangeDisplayed={2}*/}
          {/*    marginPagesDisplayed={3}*/}
          {/*    renderOnZeroPageCount={null}*/}
          {/*    onPageChange={(data) => {*/}
          {/*      setQueryParams({ ...queryParams, page: data.selected + 1 });*/}
          {/*    }}*/}
          {/*    // ----*/}
          {/*    previousLabel={*/}
          {/*      <div*/}
          {/*        className={classNames(*/}
          {/*          'cursor-pointer rounded-l-lg bg-[#141414] p-[9px]',*/}
          {/*          'group-[.disabled]:cursor-not-allowed',*/}
          {/*        )}*/}
          {/*      >*/}
          {/*        <FaAngleLeft*/}
          {/*          width={24}*/}
          {/*          height={24}*/}
          {/*          className="fill-[#929292]"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*    breakLabel="..."*/}
          {/*    nextLabel={*/}
          {/*      <div*/}
          {/*        className={classNames(*/}
          {/*          'cursor-pointer rounded-r-lg bg-[#141414] p-[9px] ',*/}
          {/*          'group-[.disabled]:cursor-not-allowed',*/}
          {/*        )}*/}
          {/*      >*/}
          {/*        <FaAngleRight*/}
          {/*          width={24}*/}
          {/*          height={24}*/}
          {/*          className="fill-[#929292]"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*    // ----*/}
          {/*    containerClassName="w-full flex flex-row items-center justify-center rounded-lg bg-[#141414]"*/}
          {/*    previousClassName="group"*/}
          {/*    breakLinkClassName={classNames(*/}
          {/*      'rounded-lg text-gray-500 hover:text-indigo-500 p-[9px] transition-all duration-300',*/}
          {/*    )}*/}
          {/*    nextClassName="group"*/}
          {/*    pageLinkClassName={classNames(*/}
          {/*      'rounded-lg text-gray-500 hover:text-indigo-500 hover:bg-gray-200 p-[9px] transition-all duration-300',*/}
          {/*    )}*/}
          {/*    activeLinkClassName="text-white font-normal"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
}
