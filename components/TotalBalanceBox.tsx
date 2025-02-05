import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

function TotalBalanceBox({ accounts = [], totalBanks, totalCurrentBalance }: TotlaBalanceBoxProps) {
  return (
    <section className="total-balance flex items-center gap-8">
      {/* Left Side - Doughnut Chart */}
      <div className="total-balance-chart w-1/2 flex justify-center">
        <DoughnutChart accounts={accounts} />
      </div>

      {/* Right Side - Bank Accounts Info */}
      <div className="flex flex-col gap-6 w-1/2">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>

        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex items-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TotalBalanceBox;
