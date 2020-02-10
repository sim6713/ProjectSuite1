
let FMain = Aliases.TestTD32.FMain;

let MainPanel = FMain.MDIClient.FEdits.sbMain.pMainPanel;
let ButtonsPanel = FMain.MDIClient.FEdits.sbMain.pButtonsPanel;
let LabelsPanel = FMain.MDIClient.FEdits.sbMain.pLabelsPanel;

let TextLong = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...";
let TextShort = "Lorem ipsum dolor...";

// The main test function
function Main()
{
  let process = RunApplication();
  let WinMain = MaximizeApp(process);
  OpenFormEdit(WinMain);
  /*
  FuncMemoEdit();
  FuncTextEdit();
  FuncCheckBox();
  FuncCurrencyEdit();
  FuncCheckComboBox();
  */
  FuncSpinEdit();

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
///////////////////////////////////////////////////////////////////////////////
//Перейти в первое поле 'Memo'
//Ввести произвольный многострочный текст в поле 'Memo'
//Нажать на кнопку "Значение"
//Проверить появление значения справа от кнопки
function FuncMemoEdit()
{
  ObjectInputText(MainPanel.mTest.mTestEdit.TcxCustomInnerMemo, "MemoEdit", TextLong);
  ObjectClickButton(ButtonsPanel.TcxButton, "MemoEdit");
  aqObject.CheckProperty(LabelsPanel.TcxLabel, "WndCaption", cmpEqual, TextLong, true);
}
/////////////////////////////////////////////////////////////////
//Ввести произвольное значение в поле 'TextEdit'
//Нажать на кнопку "Значение"
//Проверить появление значения справа от кнопки
function FuncTextEdit()
{
  ObjectInputText(MainPanel.edTest.edTestEdit.TcxCustomInnerTextEdit, "TextEdit", TextShort);
  ObjectClickButton(ButtonsPanel.TcxButton2, "TextEdit");
  aqObject.CheckProperty(LabelsPanel.TcxLabel2, "WndCaption", cmpEqual, TextShort, true);
}
/////////////////////////////////////////////////////////////////
//Нажать на кнопку "Значение" справа от 'CheckBox'
//Проверить появление значения справа от кнопки
//Поставить галку в поле 'CheckBox'
//Нажать на кнопку "Значение"
//Проверить появление значения справа от кнопки
function FuncCheckBox()
{
  ObjectClickButton(ButtonsPanel.TcxButton3, "CheckBoxClickButton");
  aqObject.CheckProperty(LabelsPanel.TcxLabel3, "WndCaption", cmpEqual, "False", false);
  ObjectClickButton(MainPanel.cbTest.cbTestEdit, "CheckBoxChecked");
  ObjectClickButton(ButtonsPanel.TcxButton3, "CheckBoxClickButton");
  aqObject.CheckProperty(LabelsPanel.TcxLabel3, "WndCaption", cmpEqual, "True", false);
}
/////////////////////////////////////////////////////////////////
//Ввести произвольное значение в поле 'CurrencyEdit'
//Нажать на кнопку "Значение"
//Проверить появление значения справа от кнопки
function FuncCurrencyEdit()
{
  let input_value = "123";
  ObjectInputText(MainPanel.ceTest.ceTestEdit.TcxCustomInnerTextEdit, "CurrencyEditInputValue", input_value);
  ObjectClickButton(ButtonsPanel.TcxButton4, "CurrencyEditClickButton");
  aqObject.CheckProperty(LabelsPanel.TcxLabel4, "WndCaption", cmpEqual, input_value, false);
}
/////////////////////////////////////////////////////////////////
//Развернуть список и выбрать произвольное значение в поле 'CheckComboBox'
//Нажать на кнопку "Значение"
//Проверить появление значения справа от кнопки
function FuncCheckComboBox()
{ 
  let tcxCheckComboBox = MainPanel.ccbTest.ccbTestEdit;
  ObjectClickButton(tcxCheckComboBox, "CheckComboBoxClick");
  
  tcxCheckComboBox.TcxCustomComboBoxInnerEdit.Keys("[Down] [Enter]");    
  ObjectClickButton(ButtonsPanel.TcxButton5, "CheckComboBoxClickButton");
  
  aqObject.CheckProperty(LabelsPanel.TcxLabel5, "WndCaption", cmpContains, "1", false);
  Log.Picture(LabelsPanel.TcxLabel5, "CheckComboBoxCheckValue");  
}
/////////////////////////////////////////////////////////////////
//Ввести произвольное значение в поле 'SpinEdit'
//Увеличить или уменьшить значение в поле 'SpinEdit' с помощью стрелок
//Нажать на кнопку "Значение"
//Проверить появление значения справа от кнопки
function FuncSpinEdit()
{
  let value1 = 8;
  let value2 = 3;
  
  var result = value1 - value2;

  let tcxSpinEdit = MainPanel.seTest.seTestEdit;
  tcxCustomInnerTextEdit = tcxSpinEdit.TcxCustomInnerTextEdit_;
 
  tcxSpinEdit.Keys("^A");
  tcxSpinEdit.Keys("[BS]");
  
  ObjectInputText(tcxCustomInnerTextEdit, "FuncSpinEditInputValue", value1);

  for(i = 0; i < value2; i++)
  {
    tcxSpinEdit.Keys("[Down]");
  }
  
  ObjectClickButton(ButtonsPanel.TcxButton6, "SpinEditClickButton");
  aqObject.CheckProperty(LabelsPanel.TcxLabel6, "WndCaption", cmpEqual, result, false);
  
}

//Ввести тeкст
function ObjectInputText(wnd, message, text)
{
  if (wnd.Exists)
  {
    wnd.Click();
    wnd.Keys(text);
           
    Log.Picture(wnd, message);
  }
  else
  {
    Log.Warning("Incorrect window - " + message);
  }      
}

//Нажать на кнопку
function ObjectClickButton(wndButton, message)
{
  if(wndButton)
  {
    wndButton.Click();    
    Delay(1000);           
    Log.Picture(wndButton, message);
  }
  else
  {
    Log.Warning("Incorrect window - " + message);
  }      
}


function CloseApp(p)
{  
  // Close the application
  p.Close(0);
}