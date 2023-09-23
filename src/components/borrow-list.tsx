import { useRouter } from "next/router";
import { Button } from "./button";

interface LendingListProps {
  positions: Array<{
    id: number;
    asset: string;
    amount: string;
    apy: number;
    nextPaymentDue: Date;
    currentCollateralValue: number;
    initialCollateralDeposit: number;
  }>;
}

const LendingList: React.FC<LendingListProps> = ({ positions }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Loans</h2>
      <ul>
        {positions.map((position) => (
          <li key={position.id} className="border-b border-gray-200 py-2">
            {/* Loading bar with USDC overlay */}
            <div className="relative bg-gray-300 rounded h-4 mb-2">
              <div 
                className="absolute left-0 top-0 h-4 bg-blue-500 rounded text-xs text-white text-center" 
                style={{ width: `${(position.currentValue / position.initialDeposit) * 100}%` }}>
                USDC
              </div>
            </div>

            <p><strong>Asset:</strong> {position.asset}</p>
            <p><strong>Amount:</strong> {position.amount}</p>
            <p><strong>APY:</strong> {position.interest}%</p>
            <p><strong>Next Payment Due:</strong> {position.dueDate.toLocaleDateString()}</p>
            <p>
              <strong>Collateral Value:</strong> Initial: ${position.initialDeposit}, Current: ${position.currentValue}
            </p>
            <Button
              onClick={() => {
                // Add functionality for repayment
                console.log("Repaying for position:", position.id);
              }}
            >
              Repay Loan
            </Button>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          router.push("/borrow-asset");
        }}
      >
        Get Loan
      </Button>
    </div>
  );
};
In this version:

I used an absolute-positioned div to represent the progress of the USDC.
I added a dueDate to each position to indicate when the next payment is due.
I added an initial and current value to each loan position to represent the initial deposit and its current value, respectively. The progress bar width is calculated based on these values.
I added a button to repay the loan. This should be linked to a function that processes the repayment.
You may need to further adjust and customize this based on your application's specifics and the exact behavior you want.





