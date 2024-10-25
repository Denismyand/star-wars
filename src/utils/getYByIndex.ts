export const getYByIndex = ({
  initialY,
  index,
  stepSize = 150,
}: {
  initialY: number;
  index: number;
  stepSize?: number;
}) => {
  const leftFromDividing = index % 3;
  switch (leftFromDividing) {
    case 0:
      return initialY + stepSize;
    case 1:
      return initialY + stepSize * 2;
    case 2:
      return initialY + stepSize * 3;
    default:
      return initialY + stepSize;
  }
};
