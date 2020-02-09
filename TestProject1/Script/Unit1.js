
// The main test function
function Main()
{
  let process = RunApplication();
  let WinMain = MaximizeApp(process);
  OpenFormEdit(WinMain);
  
  Delay(3000);
  CloseApp(process);
}

// Запустить приложение
function RunApplication()
{
  return TestedApps.TestTD32.Run();
}

// азвернуть приложение на весь экран
function MaximizeApp(p)
{
  w = p.WaitWindow("TFMain", "FMain", -1, 5000);
  
  if (w.Exists)
    {
      w.Activate();
      Log.Picture(w, "MaximizeApp");
    }
    else
      Log.Warning("Incorrect window - MaximizeApp");
      
  w.Maximize();
  return w;
}

//Выбрать раздел "Форма редакторов"
function OpenFormEdit(w)
{
  if (w.Exists)
    {
      w.Activate();
      w.Click(60, 40);
      Log.Picture(w, "OpenFormEdit");
    }
    else
      Log.Warning("Incorrect window - OpenFormEdit");   
}


function CloseApp(p)
{  
  // Close the application
  p.Close(0);
}