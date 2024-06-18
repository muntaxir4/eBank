import SearchBox from "./SearchBox";
import TransactionHistory from "./Transactions/TransactionsHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function DashboardOptions() {
  return (
    <Tabs defaultValue="find" className="w-full">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="find">Find Others</TabsTrigger>
        <TabsTrigger value="transactions">My Transactions</TabsTrigger>
      </TabsList>
      <TabsContent value="find">
        <SearchBox />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionHistory />
      </TabsContent>
    </Tabs>
  );
}

export default DashboardOptions;
