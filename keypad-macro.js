/********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 11/18/22
 * 
 * This is a simple macro which creates a custom Dial icon and keypad 
 * where you can enter a phone number and place a call.
 * 
 * Full Readme, source code and license agreement available on Github:
 * https://github.com/wxsd-sales/keypad-macro
 * 
 ********************************************************/

import xapi from 'xapi';

/*********************************************************
 * Configure the settings below
**********************************************************/


const config = {
  panelId: 'custom-keypad',
  button: {
    name: 'Custom Keypad',
    icon: 'Handset',
    color: '#1170CF'
  },
  panelKeys: [
    ['display', '❌'],
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
    ['', '📞', '']
  ]
}

/*********************************************************
 * Main functions and event subscriptions
**********************************************************/

createPanel(config.button)
xapi.Event.UserInterface.Extensions.Widget.Action.on(processWidgets);
xapi.Event.UserInterface.Extensions.Panel.Clicked.on(processClicks)

let holding = null;

function processClicks(event) {
  if (event.PanelId != config.panelId) return;
  clearDiplay();
}

function processWidgets(event) {
  if (!event.WidgetId.startsWith(config.panelId)) return;
  if (event.Type == 'clicked') return;
  const selection = event.WidgetId.split('-').pop();
  
  if (event.Type == 'released') {
    holding = null;
    return
  }

  if (event.Type != 'pressed') return;
  
  console.log(`Key [${selection}] pressed`)
  switch (selection) {
    case '📞':
    case 'call':
    case 'Call':
      placeCall();
      break;
    case 'del':
    case '❌':
      delDigit();
      break;
    default:
      addDigit(selection);
  }
  holding = selection;
  setTimeout(processHold, 1500, selection)
}

async function processHold(digit){
  if(holding != digit) return;
  holding = null;
  switch (digit) {
    case 'del':
    case '❌':
      console.log(`Key [${digit}] held, clearing display`);
      clearDiplay();
      break;
    case '0':
      await delDigit();
      addDigit('+');
      console.log(`Digit [0] relaced with [+]`)
      break;
  }
}

async function getDisplayValue(){
  const widgets = await xapi.Status.UserInterface.Extensions.Widget.get()
  const display = widgets.find(widget => widget.WidgetId === config.panelId + '-display')
  return display.Value
}

async function addDigit(digit) {
  const number = await getDisplayValue() + digit;
  xapi.Command.UserInterface.Extensions.Widget.SetValue(
        { Value: number, WidgetId: config.panelId + '-display' });
}

async function delDigit() {
  const number = await getDisplayValue()
  const newNumber = number.substring(0, number.length - 1);
  return xapi.Command.UserInterface.Extensions.Widget.SetValue(
        { Value: newNumber, WidgetId: config.panelId + '-display' });
}

async function clearDiplay() {
  xapi.Command.UserInterface.Extensions.Widget.SetValue(
    { Value: '', WidgetId: `${config.panelId}-display` });
}

async function placeCall() {
  const number = await getDisplayValue()
  console.log('Dialling: ' + number);
  xapi.Command.Dial({ Number: number });
  clearDiplay();
}

function createPanel() {
  let rows = '';
  config.panelKeys.forEach(keyRows => {
    let row = '';
    keyRows.forEach(key => {
      let widget = ''
      if (key == 'display') {
        widget = `<Widget>
                <WidgetId>${config.panelId}-display</WidgetId>
                <Name/>
                <Type>Text</Type>
                <Options>size=3;fontSize=normal;align=center</Options>
              </Widget>`;
      } else if (key == '') {
        widget = `<Widget>
                <WidgetId>${config.panelId}-spacer</WidgetId>
                <Type>Spacer</Type>
                <Options>size=1</Options>
              </Widget>`;
      } else {
        widget = `<Widget>
                <WidgetId>${config.panelId}-${key}</WidgetId>
                <Name>${key}</Name>
                <Type>Button</Type>
                <Options>size=1</Options>
              </Widget>`;
      }
      row = row.concat(widget)
    })
    rows = rows.concat('<Row>' + row + '</Row>');
  })

  const panel = `
  <Extensions>
    <Panel>
      <Location>HomeScreen</Location>
      <Type>Home</Type>
      <Icon>${config.button.icon}</Icon>
      <Color>${config.button.color}</Color>
      <Name>${config.button.name}</Name>
      <ActivityType>Custom</ActivityType>
      <Page>
        <Name>${config.button.name}</Name>
        ${rows}
        <Options>hideRowNames=1</Options>
      </Page>
    </Panel>
  </Extensions>`;

  xapi.Command.UserInterface.Extensions.Panel.Save(
    { PanelId: config.panelId },
    panel
  )
}
