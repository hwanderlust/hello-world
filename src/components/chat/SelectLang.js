import React from 'react';

class SelectLang extends React.Component {

  languages = () => {
    return [
      {name: 'Arabic', code: 'ar'},
      {name: 'ChineseSimplified', code: 'zh-CN'},
      {name: "ChineseTraditional", code: 'zh-TW'},
      {name: 'Croatian', code: 'hr'},
      {name: 'Danish', code: 'da'},
      {name: 'Dutch', code: 'nl'},
      {name: 'English', code: 'en'},
      {name: 'Finnish', code: 'fi'},
      {name: 'French', code: 'fr'},
      {name: 'German', code: 'de'},
      {name: 'Greek', code: 'el'},
      {name: 'Hawaiian', code: 'haw'},
      {name: 'Hebrew', code: 'iw'},
      {name: 'Hindi', code: 'hi'},
      {name: 'Hungarian', code: 'hu'},
      {name: 'Icelandic', code: 'is'},
      {name: 'Indonesian', code: 'id'},
      {name: 'Irish', code: 'ga'},
      {name: 'Italian', code: 'it'},
      {name: 'Japanese', code: 'ja'},
      {name: 'Khmer', code: 'km'},
      {name: 'Korean', code: 'ko'},
      {name: 'Lao', code: 'lo'},
      {name: 'Latin', code: 'la'},
      {name: 'Malay', code: 'ms'},
      {name: 'Maori', code: 'mi'},
      {name: 'Mongolian', code: 'mn'},
      {name: 'Persian', code: 'fa'},
      {name: 'Polish', code: 'pl'},
      {name: 'Portuguese', code: 'pt'},
      {name: 'Punjabi', code: 'pa'},
      {name: 'Russian', code: 'ru'},
      {name: 'Slovak', code: 'sk'},
      {name: 'Spanish', code: 'es'},
      {name: 'Swahili', code: 'sw'},
      {name: 'Swedesh', code: 'sv'},
      {name: 'Tagolog', code: 'tl'},
      {name: 'Thai', code: 'th'},
      {name: 'Turkish', code: 'tr'},
      {name: 'Ukranian', code: 'uk'},
      {name: 'Vietnamese', code: 'vi'}
    ]
  }

  handleChange = (e) => {
    // pass up to Chat and then pass down to Message
    // OR
    // save in store and pass to Message
    console.log(e.target.selectedOptions[0].id);
    this.props.handleMsgClick()
  }

  render() {

    const renderLanguages =  () => {
      return this.languages().map(lang => <option key={lang.code} id={lang.code}>{lang.name}</option>)
    }

    return (
      <div>
        <select onChange={this.handleChange} style={{width: '200px', height: '50px', zIndex: '5'}}>
          { renderLanguages() }
        </select>
      </div>
    )
  }
}

export default SelectLang;
