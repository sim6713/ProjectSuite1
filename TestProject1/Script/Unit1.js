

// The main test function
function Main()
{
  let process = RunApplication();
  MaximizeApp(process);
  
  CloseApp(process);
}

// Run the tested application
function RunApplication()
{
  return TestedApps.TestTD32.Run();
}


function MaximizeApp(process)
{
  w = process.WaitWindow("TFMain", "FMain", -1, 5000);
  
  if (w.Exists)
    {
      w.Activate();
      Log.Picture(w, "MaximizeApp");
    }
    else
      Log.Warning("Incorrect window - MaximizeApp");
      
  w.Maximize();
}

function CloseApp(process)
{
    let p = process;
    // Waits for the window for 5 seconds
    w = p.WaitWindow("TFMain", "FMain", -1, 5000);
    
    if (w.Exists)
    {
      w.Activate();
      Log.Picture(w, "CloseApp");
    }
    else
      Log.Warning("Incorrect window - CloseApp");
  
  // Close the application
  w.Close(0);
}