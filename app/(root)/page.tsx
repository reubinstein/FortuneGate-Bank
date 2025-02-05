import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async () => {
  const LoggedIn=  await getLoggedInUser();
  return (
    <section className="home">
    <div className="home-content">
      <header className="home-header">
        <HeaderBox
         type="greeting"
         title="Welcome"
         user={LoggedIn?.name || 'Guest'}
         subtext="Access and manage your account and transactions"
         />

         <TotalBalanceBox
         accounts={[]}
         totalBanks={1}
         totalCurrentBalance={50000.90}
         />
      </header>
      RECENT TRANSACTIONS
    </div>
      <RightSidebar
      user={LoggedIn}
      transactions={[]}
      banks={[{currentBalance:200000},{ currentBalance:500000}]}
      />
    </section>
  )
}

export default Home