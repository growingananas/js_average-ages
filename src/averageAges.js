'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(person => person.sex === 'm');

  const menFilteredByCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  const sumOfMenAges = menFilteredByCentury.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  const menAgeAverage = sumOfMenAges / menFilteredByCentury.length;

  return menAgeAverage;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const womenFilteredByChildren = withChildren
    ? women.filter(person => people.some(p => p.mother === person.name))
    : women;
  const sumOfwomenAges = womenFilteredByChildren.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);
  const womenAgeAverage = sumOfwomenAges / womenFilteredByChildren.length;

  return womenAgeAverage;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person =>
    people.find(mother =>
      mother.name === person.mother)
      && (onlyWithSon ? person.sex === 'm' : true));

  const ageDiffs = children.map(child => {
    const mother = people.find(person => child.mother === person.name);

    return child.born - mother.born;
  });

  const ageDiffSum = ageDiffs.reduce((sum, age) => sum + age, 0);

  const ageDiffAverage = ageDiffSum / children.length;

  return ageDiffAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
