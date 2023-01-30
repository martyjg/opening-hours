import styled from 'styled-components';

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--divider-default);
  text-transform: capitalize;
  padding: 0.4rem 0;
  &:first-child {
    border-top: 1px solid var(--typography-default);
  }
`;

export const DayText = styled.p`
  font-weight: 700;
`;

interface TimetextProps {
  inactive?: boolean;
}

export const TimeText = styled.p<TimetextProps>`
  text-align: right;
  max-width: 50%;
  font-weight: 500;
  color: ${(props) => (props.inactive ? 'var(--typography-inactive)' : '')};
`;
