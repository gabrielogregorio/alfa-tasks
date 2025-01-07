export const getCurrentDate = () => new Date().toLocaleDateString('pt-br');

export const getLastXOldCurrentDate = (xOldPeriod: number) => {
  const lastXOldPeriod: string[] = [];

  const today = new Date();

  for (let index = 0; index < xOldPeriod; index += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    lastXOldPeriod.push(date.toLocaleDateString('pt-br'));
  }

  return lastXOldPeriod;
};
