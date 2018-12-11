/*
Code adopted from android skinny text available here:
https://sites.google.com/site/androidskinnytext/skinny.js
Random capitalization added
*/

var reversal_map =
{
  '\u0041': '\uff21',   '\u0042': '\uff22',   '\u0043': '\uff23',  '\u0044': '\uff24',   '\u0045': '\uff25',   '\u0046': '\uff26',
  '\u0047': '\uff27',   '\u0048': '\uff28',   '\u0049': '\uff29',   '\u004a': '\uff2a',   '\u004b': '\uff2b',   '\u004c': '\uff2c',
  '\u004d': '\uff2d',   '\u004e': '\uff2e',   '\u004f': '\uff2f',   '\u0050': '\uff30',   '\u0051': '\uff31',   '\u0052': '\uff32',
  '\u0053': '\uff33',   '\u0054': '\uff34',   '\u0055': '\uff35',   '\u0056': '\uff36',   '\u0057': '\uff37',   '\u0058': '\uff38',
  '\u0059': '\uff39',   '\u005a': '\uff3a',

  '\u0061': '\uff41',   '\u0062': '\uff42',   '\u0063': '\uff43',   '\u0064': '\uff44',   '\u0065': '\uff45',   '\u0066': '\uff46',
  '\u0067': '\uff47',   '\u0068': '\uff48',   '\u0069': '\uff49',   '\u006a': '\uff4a',   '\u006b': '\uff4b',   '\u006c': '\uff4c',
  '\u006d': '\uff4d',   '\u006e': '\uff4e',   '\u006f': '\uff4f',   '\u0070': '\uff50',   '\u0071': '\uff51',   '\u0072': '\uff52',
  '\u0073': '\uff53',   '\u0074': '\uff54',   '\u0075': '\uff55',   '\u0076': '\uff56',   '\u0077': '\uff57',   '\u0078': '\uff58',
  '\u0079': '\uff59',   '\u007a': '\uff5a'
};

var complete_map;

function convert_to_fullwidth(text) {
  if(!complete_map) {
    complete_map = { };
    for(var key in reversal_map) {
      var val = reversal_map[key];
      if(!reversal_map[val])
        complete_map[reversal_map[key]] = key;
      complete_map[key] = val;
    }
  }
  var str = "";
  for (var i = 0; i < text.length; ++i) {
    var ch = text.charAt(i);
    var rev = complete_map[ch];
    if(rev)
      str += rev;
    else
      str += ch;
  }
  return str;
}

function convert_to_random_capitalization(text) {
  var str = "";
  var i = 0;
  var last = "";
  for (i = 0; i < text.length; i++) {
    var pad = 0;
    if (last == last.toUpperCase())
      pad = -0.25;
    else 
      pad = 0.25;

    var ch = text.charAt(i);
    var rand = Math.random();
    if (rand < 0.5 + pad) 
      ch = ch.toUpperCase();
    else
      ch = ch.toLowerCase();
    str += ch;
    last = ch;
  }
  return str;
}

function getText(input, output) {
  output.value = convert_to_fullwidth(input.value);
}

function randomCapitalization(input, output) {
  output.value = convert_to_random_capitalization(input.value);
}