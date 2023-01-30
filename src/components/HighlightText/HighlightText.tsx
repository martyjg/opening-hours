import * as Styled from './HighlightText.styled';

type Props = {
  children: React.ReactNode;
};

const HighlightText = ({ children }: Props) => {
  return <Styled.Text>{children}</Styled.Text>;
};

export default HighlightText;
