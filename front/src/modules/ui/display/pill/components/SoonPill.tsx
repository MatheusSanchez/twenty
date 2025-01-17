import styled from '@emotion/styled';

const StyledSoonPill = styled.span`
  align-items: center;
  background: ${({ theme }) => theme.background.transparent.light};
  border-radius: ${({ theme }) => theme.border.radius.pill};
  color: ${({ theme }) => theme.font.color.light};
  display: inline-block;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-style: normal;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  gap: ${({ theme }) => theme.spacing(2)};
  height: ${({ theme }) => theme.spacing(4)};
  justify-content: flex-end;
  line-height: ${({ theme }) => theme.text.lineHeight.lg};
  margin-left: auto;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}`};
`;

export const SoonPill = () => <StyledSoonPill>Soon</StyledSoonPill>;
