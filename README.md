# Custom Keypad Macro

This is a simple macro which creates a custom dial icon and keypad panel on your Webex Devices.

![output_LFluIn](https://user-images.githubusercontent.com/21026209/164456479-8aaba3d3-b0d9-45f2-a229-7f4f67671cec.gif)

## Overview

Webex Devices let you design your own custom interfaces using its native UI Extensions capabilities. With this example macro, we demonstrate how to programmatically generate a UI Extension panel and process widget and button presses. In this particular example we show how to create a custom keypad to collect number inputs and even included a long press input detection to convert a ``0`` into a ``+``.

## Setup

### Prerequisites & Dependencies: 

- Webex Device running RoomOS 9.x or greater
- Web admin access to the device to uplaod the macro.

### Installation Steps:

1. Download the ``keypad-macro.js`` file and upload it to your Webex Desks Macro editor via the web interface.
2. Configure the macros in the config section, you can set alternative text, button color and keypad layouts.
```javascript
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
```
3. Enable the Macro on the editor.
    
## Validation

Validated Hardware:

* Codec Pro & Room Navigator
* Desk Pro
* Desk Hub

This macro should work on other Webex Devices but has not been validated at this time.

## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).

## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions

Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=keypad-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
