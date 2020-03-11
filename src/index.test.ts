// import { startServer } from "./index";
import { testConn } from "./test-utils/testConn";
test("Test database connect ", async () => {
  await testConn();
});
