import {styled} from 'react-tabtab';
let {TabListStyle, TabStyle, PanelStyle} = styled;

TabListStyle = TabListStyle.extend`

`;

TabStyle = TabStyle.extend`

`;

PanelStyle = PanelStyle.extend`
  height: '50vh';
  overflowY: 'scroll'
`;

// need to follow this object naming
// module.exports = {
//   TabList: TabListStyle,
//   Tab: TabStyle,
//   Panel: PanelStyle
// }
