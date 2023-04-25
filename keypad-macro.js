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


// Customise the button and panel name
const BUTTON_NAME = 'Custom Keypad';


async function addDigit(digit, id) {

  const widgets = await xapi.Status.UserInterface.Extensions.Widget.get()

  for (let i = 0; i < widgets.length; i++) {
    if (widgets[i].WidgetId == KEY_DISPLAY ){
      const number = widgets[i].Value + '' + digit;
      console.log('Display: ' +widgets[i].Value);
      xapi.Command.UserInterface.Extensions.Widget.SetValue(
        { Value: number, WidgetId: KEY_DISPLAY });
      return;
    }
  }

}

async function delDigit() {

  const widgets = await xapi.Status.UserInterface.Extensions.Widget.get()

  for (let i = 0; i < widgets.length; i++) {
    if (widgets[i].WidgetId == KEY_DISPLAY ){

      let existing = widgets[i].Value;
      
      console.log('Existing: ' +existing);

      if(existing == 0) {
        return
      }

      existing = existing.substring(0, existing.length - 1);

      xapi.Command.UserInterface.Extensions.Widget.SetValue(
        { Value: existing, WidgetId: KEY_DISPLAY });

      return;
    }
  }

}

async function clearDiplay() {

  console.log('Clearning display');

  xapi.Command.UserInterface.Extensions.Widget.SetValue(
    { Value: '', WidgetId: KEY_DISPLAY });
  
}

async function placeCall() {

  const widgets = await xapi.Status.UserInterface.Extensions.Widget.get()

  for (let i = 0; i < widgets.length; i++) {
    if (widgets[i].WidgetId == KEY_DISPLAY ){
      const number = widgets[i].Value;
      console.log('Dialling: ' +number);
      xapi.Command.Dial(
        { Number: number });
      clearDiplay();
      return;
    }
  }


}

function main() {

  // Create the panel
  createPanel();

  // Listen for all toggle events
  xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
    console.log(event);
    if(event.Type != 'pressed'){
      return;
    }
    switch (event.WidgetId) {
      case KEY_1:
        addDigit(1, event.id);
        break;
      case KEY_2:
        addDigit(2, event.id);
        break;
      case KEY_3:
        addDigit(3, event.id);
        break;
      case KEY_4:
        addDigit(4, event.id);
        break;
      case KEY_5:
        addDigit(5, event.id);
        break;
      case KEY_6:
        addDigit(6);
        break;
      case KEY_7:
        addDigit(7);
        break;
      case KEY_8:
        addDigit(8);
        break;
      case KEY_9:
        addDigit(9);
        break;
      case KEY_0:
        addDigit(0);
        break;
      case KEY_STAR:
        addDigit('*');
        break;
      case KEY_HASH:
        addDigit('#');
        break;
      case KEY_PLUS:
        addDigit('+');
        break;
      case KEY_CALL:
        placeCall();
        break;
      case KEY_DEL:
        delDigit();
        break;
    }      
  });


  xapi.Event.UserInterface.Extensions.Panel.Clicked.on( event => {

    if (event.PanelId == 'custom-keypad') {
      clearDiplay();
    }


  });

}

const KEY_1 = 'key_1';
const KEY_2 = 'key_2';
const KEY_3 = 'key_3';
const KEY_4 = 'key_4';
const KEY_5 = 'key_5';
const KEY_6 = 'key_6';
const KEY_7 = 'key_7';
const KEY_8 = 'key_8';
const KEY_9 = 'key_9';
const KEY_0 = 'key_0';
const KEY_STAR = 'key_star';
const KEY_HASH = 'key_hash';
const KEY_PLUS = 'key_plus';
const KEY_CALL = 'key_call';
const KEY_DEL = 'key_del';
const KEY_DISPLAY = 'key_display';

function createPanel() {

  const panel = `
  <Extensions>
    <Panel>
      <Order>3</Order>
      <Type>Home</Type>
      <Icon>Handset</Icon>
      <Color>#1170CF</Color>
      <Name>${BUTTON_NAME}</Name>
      <ActivityType>Custom</ActivityType>
      <Page>
        <Name>${BUTTON_NAME}</Name>
        <Row>
          <Name>Row</Name>
          <Widget>
            <WidgetId>${KEY_DISPLAY}</WidgetId>
            <Name/>
            <Type>Text</Type>
            <Options>size=3;fontSize=normal;align=center</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_DEL}</WidgetId>
            <Name>&lt;=</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
        </Row>
        <Row>
          <Name>Row</Name>
          <Widget>
            <WidgetId>${KEY_1}</WidgetId>
            <Name>1</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_2}</WidgetId>
            <Name>2</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_3}</WidgetId>
            <Name>3</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
        </Row>
        <Row>
          <Name>Row</Name>
          <Widget>
            <WidgetId>${KEY_4}</WidgetId>
            <Name>4</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_5}</WidgetId>
            <Name>5</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_6}</WidgetId>
            <Name>6</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
        </Row>
        <Row>
          <Name>Row</Name>
          <Widget>
            <WidgetId>${KEY_7}</WidgetId>
            <Name>7</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_8}</WidgetId>
            <Name>8</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_9}</WidgetId>
            <Name>9</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
        </Row>
        <Row>
          <Name>Row</Name>
          <Widget>
            <WidgetId>${KEY_STAR}</WidgetId>
            <Name>*</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_0}</WidgetId>
            <Name>0</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_HASH}</WidgetId>
            <Name>#</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
        </Row>
        <Row>
          <Name>Row</Name>
          <Widget>
            <WidgetId>${KEY_PLUS}</WidgetId>
            <Name>+</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>widget_spacer</WidgetId>
            <Type>Spacer</Type>
            <Options>size=1</Options>
          </Widget>
          <Widget>
            <WidgetId>${KEY_CALL}</WidgetId>
            <Name>Call</Name>
            <Type>Button</Type>
            <Options>size=1</Options>
          </Widget>
        </Row>
        <Options>hideRowNames=1</Options>
      </Page>
    </Panel>
  </Extensions>`;


  xapi.Command.UserInterface.Extensions.Panel.Save(
    { PanelId: 'custom-keypad' }, 
    panel
  )
  
}


main();
