import { useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
// import classNames from 'classnames';
import { useAccount } from 'wagmi';

// import ArrowLeftIcon from '@/components/Icon/ArrowLeft';
import Link from 'next/link';

import { useGetTransactionReward } from '@/hooks/useQueryApi';
import { shortenAddress } from '@/utils/string';

export default function TransactionReward() {
  // const [queryParams, setQueryParams] = useState<APIParams.Pagination>({
  //   page: 1,
  //   size: 5,
  // });
  const { address } = useAccount();

  const { data, mutate } = useGetTransactionReward({
    params: { address: address?.toLowerCase() },
    refreshInterval: 10000,
  });
  const transactions = data?.data?.transactionPools;
  console.log(transactions);

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [mutate]);

  return (
    <>
      <div className="flex justify-center gap-4 laptop:gap-0 flex-col w-full">
        <div className="p-5 laptop:p-8 flex justify-center flex-col w-full gap-6 rounded-2xl bg-[#14141480] backdrop-blur-[2px] border border-solid border-[#4A4A4A]">
          <h3 className="text-center font-jockey text-2xl">
            Reward Transactions
          </h3>
          <div className="h-[300px] w-full overflow-y-scroll">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-[#929292]">
                  <th className="text-left w-1/3">No</th>
                  <th className="text-left w-1/3">Amount</th>
                  <th className="text-left w-1/3">TxHash</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transaction, index) => (
                  <tr key={index}>
                    <td className="py-4 text-lg border-b border-[#4a4a4a80] ...">
                      {index + 1}
                    </td>
                    <td className="py-4 text-lg border-b border-[#4a4a4a80] ...">
                      {transaction.amount} U2U
                    </td>
                    <td className="cursor-pointer py-4 text-lg border-b border-[#4a4a4a80] ...">
                      <Link target="_blank" href={`/tx/${transaction.txHash}`}>
                        {shortenAddress(transaction.txHash)}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
