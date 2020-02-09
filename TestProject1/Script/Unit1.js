
// The main test function
function Main()
{
  let process = RunApplication();
  
  //Close(process);
}

// Run the tested application
function RunApplication()
{
  return TestedApps.TestTD32.Run();
}