import theme from './theme';

interface LogProps {
  title: string;
  titleBg?: string;
  titleColor?: string;
  text: string | object;
  textBg?: string;
  textColor?: string;
}

export const l = (config: LogProps) => {
  let { title, titleBg, titleColor, text, textBg, textColor } = config;

  if (typeof text === 'object') {
    console.log('enter: ', typeof text);
    text = JSON.stringify(text);
  }

  console.log(
    `%c${title}%c: %c${text}`,
    `${titleBg ? 'background:' + titleBg + ';' : ''} ${titleColor ? 'color:' + theme(titleColor) + ';' : 'color:' + theme('') + ';'}`,
    '',
    `${textBg ? 'background:' + textBg + ';' : ''} ${textColor ? 'color:' + theme(textColor) + ';' : 'color:' + theme('green') + ';'}`
  );
};

export const dev = (config: LogProps) => {
  if (process.env.NODE_ENV === 'development') {
    l(config);
  }
};

export const prod = (config: LogProps) => {
  if (process.env.NODE_ENV === 'production') {
    l(config);
  }
};

export default {
  l,
  dev,
  prod
};
