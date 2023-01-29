import { Text } from './HighlightText.styled';

type Props = {
  children: React.ReactNode;
};

const HighlightText = ({ children }: Props) => {
  return <Text>{children}</Text>;
};

export default HighlightText;
