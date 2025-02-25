import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react';

const Home = async ({ searchParams }: SearchParamProps) => {
  try {
    if (!searchParams) {
      console.error('searchParams is undefined');
      return <p className="text-center text-red-500">Error: Invalid page parameters.</p>;
    }

    const id =  await searchParams.id || null;
    const page = searchParams.page || "1"; // Default to page 1 if undefined

    const currentPage = Number(page);
    const loggedIn = await getLoggedInUser();

    if (!loggedIn || !loggedIn.$id) {
      console.error('User is not logged in or $id is missing');
      return <p className="text-center text-red-500">Error: User not logged in.</p>;
    }

    const accounts = await getAccounts({ userId: loggedIn.$id });

    if (!accounts || !accounts.data?.length) {
      console.error('No accounts found for the user');
      return <p className="text-center text-gray-500">No accounts available.</p>;
    }

    const accountsData = accounts.data;
    const appwriteItemId = id || accountsData[0]?.appwriteItemId;
    const account = await getAccount({ appwriteItemId });

    return (
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || 'Guest'}
              subtext="Access and manage your account and transactions"
            />

            <TotalBalanceBox
              accounts={accountsData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance}
            />
          </header>

          <RecentTransactions
            accounts={accountsData}
            transactions={accounts?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}
          />
        </div>
        <RightSidebar
          user={loggedIn}
          transactions={account?.transactions}
          banks={accountsData?.slice(0, 2)}
        />
      </section>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    return <p className="text-center text-red-500">An error occurred. Please try again.</p>;
  }
};

export default Home;
