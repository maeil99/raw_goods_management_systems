/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import { IOptionsProps, FieldType } from '../../../types/form.interface';
import FormikControl from '../../layout/form/FormikControl';

// true or false option
const trueOrFalseQuestion: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Yes', value: 'true' },
  { key: 'No', value: 'false' },
];

// chicken parts option
const chickenOpt: IOptionsProps[] = [
  { key: 'Select chicken parts', value: '' },
  { key: 'Breast', value: 'breast' },
  { key: 'Wings', value: 'wings' },
  { key: 'Drumsticks', value: 'drumsticks' },
  { key: 'Ham', value: 'ham' },
  { key: 'Thigh', value: 'thigh' },
  { key: 'Liver', value: 'liver' },
  { key: 'Fourquaters', value: 'fourquaters' },
  { key: 'Hindquaters', value: 'hindquaters' },
  { key: 'Carcass', value: 'carcass' },
];

const ChickenFieldForm = () => (
  <>
    <FormikControl
      control="selectField"
      label="Chicken Parts"
      name="chickenOption"
      options={chickenOpt}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Does the chicken ever get hormone injection ?"
      name="chickenHormone"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
  </>
);

interface IMeatProps {
  IsMeatImportAns?: string;
}

// meat type option
const meatAnimalTypes: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Cow', value: 'cow' },
  { key: 'Goat', value: 'goat' },
  { key: 'Buffalo', value: 'buffalo' },
  { key: 'Sheep', value: 'sheep' },
];

const MeatFieldForm = ({ IsMeatImportAns }: IMeatProps) => (
  <>
    <FormikControl
      control="selectField"
      label="Meat type"
      name="meatAnimalTypes"
      options={meatAnimalTypes}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Does the meat imported ?"
      name="meatImport"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
    {IsMeatImportAns && IsMeatImportAns === 'true' && (
      <FormikControl
        control="textField"
        label="What country does the meat imported from ?"
        name="meatCountryImport"
        type={FieldType.TEXT}
      />
    )}
    <FormikControl
      control="selectField"
      label="Does the meat ever get hormone injection ?"
      name="meatHormone"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
  </>
);
// https://ms.wikipedia.org/wiki/Makanan_laut
const seafoodTypes: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Fish', value: 'fish' },
  { key: 'Mollusca', value: 'mollusca' },
  { key: 'Crustacea', value: 'crustacea' },
];

// mollusca types opt
const molluscaLists: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Shells', value: 'shells' },
  { key: 'Sea snail', value: 'sea_snail' },
];

// crustacea types opt
const crustaceaLists: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Prawn', value: 'prawn' },
  { key: 'Crab', value: 'crab' },
  { key: 'Crayfish', value: 'crayfish' },
  { key: 'Kril', value: 'kril' },
];

// fish types option
const fishLists: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  // Ikan Bawal
  { key: 'Pomfret', value: 'pomfret' },
  // ikan siakap
  { key: 'Barramundi', value: 'barramundi' },
  // ikan cencaru
  { key: 'Torpedo scad', value: 'torpedo_scad' },
  // Ikan Selar
  { key: 'Yellowtail scad', value: 'yellowtail_scad' },
  // ikan jenahak
  { key: 'Snapper', value: 'snapper' },
  // Ikan Tenggiri
  { key: 'Spanish mackerels', value: 'spanish_mackerels' },
  // Ikan Haruan
  { key: 'Snakehead murrel', value: 'snakehead_murrel' },
  // Ikan Kembung
  { key: 'Chub mackerels', value: 'chub_mackerels' },
  // Ikan Merah
  { key: 'Northern red snapper', value: 'northern_red_snapper' },
];

//  fish catch opt
const fishCatch: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Fish farm', value: 'fish_farm' },
  { key: 'Catch fresh', value: 'fish_fresh' },
];

interface ISeafoodProps {
  seafoodTypesAns: string;
}

const SeafoodFieldForm = ({ seafoodTypesAns }: ISeafoodProps) => (
  <>
    <FormikControl
      control="selectField"
      label="Type of Seafood ?"
      name="seafoodTypes"
      options={seafoodTypes}
      type={FieldType.TEXT}
    />
    {seafoodTypesAns === 'fish' && (
      <>
        <FormikControl
          control="selectField"
          label="Fish type"
          name="fishList"
          options={fishLists}
          type={FieldType.TEXT}
        />
        <FormikControl
          control="selectField"
          label="Is the fish farm or catch fresh  ?"
          name="fishFresh"
          options={fishCatch}
          type={FieldType.TEXT}
        />
        <FormikControl
          control="selectField"
          label="Is the fish already clean  ?"
          name="fishClean"
          options={trueOrFalseQuestion}
          type={FieldType.TEXT}
        />
        <FormikControl
          control="selectField"
          label="Is the fish already preservation  ?"
          name="fishPreservation"
          options={trueOrFalseQuestion}
          type={FieldType.TEXT}
        />
      </>
    )}
    {seafoodTypesAns === 'mollusca' && (
      <FormikControl
        control="selectField"
        label="Mollusca types"
        name="molluscaList"
        options={molluscaLists}
        type={FieldType.TEXT}
      />
    )}
    {seafoodTypesAns === 'crustacea' && (
      <FormikControl
        control="selectField"
        label="Crustacea types"
        name="crustaceaList"
        options={crustaceaLists}
        type={FieldType.TEXT}
      />
    )}
  </>
);

//  fish catch opt
const vegLists: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Spinach', value: 'spinach' },
  { key: 'Sweet Shoot', value: 'sweet_shoot' },
  { key: 'Spring Onion', value: 'spring_onion' },
  { key: 'Chinese Kale', value: 'chinese_kale' },
  { key: 'Water Spinach', value: 'water_spinach' },
  { key: 'Cabbage', value: 'cabbage' },
  { key: 'Chinese Cabbage', value: 'chinese_cabbage' },
  { key: 'Lettuce', value: 'lettuce' },
  { key: 'Leaf Mustard', value: 'leaf_mustard' },
];

const vegTypeOfFertilizer: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Organic', value: 'organic' },
  { key: 'Chemical', value: 'chemical' },
];

interface IVegetableProps {
  vegIsFertilizerUsedAns: string;
  isVegImportAns: string;
}

const VegetableForm = ({
  vegIsFertilizerUsedAns,
  isVegImportAns,
}: IVegetableProps) => (
  <>
    <FormikControl
      control="selectField"
      label="Vegetable types"
      name="vegList"
      options={vegLists}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Did the product use any fertilizer?"
      name="vegFertilizer"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
    {vegIsFertilizerUsedAns && vegIsFertilizerUsedAns === 'true' && (
      <FormikControl
        control="selectField"
        label="Type of fertilizer"
        name="vegTypeOfFertilizer"
        options={vegTypeOfFertilizer}
        type={FieldType.TEXT}
      />
    )}
    <FormikControl
      control="selectField"
      label="Does the vegetable imported ?"
      name="vegImport"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
    {isVegImportAns && isVegImportAns === 'true' && (
      <FormikControl
        control="textField"
        label="What country does the vegetable imported from ?"
        name="vegCountryImport"
        type={FieldType.TEXT}
      />
    )}
    <FormikControl
      control="selectField"
      label="Does the vegetable used any pesticides?"
      name="vegPesticide"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
  </>
);

interface IFruitProps {
  // vegIsFertilizerUsedAns: string;
  isFruitImportAns: string;
}

const fruitLists: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Watermelon', value: 'watermelon' },
  { key: 'Grape', value: 'grape' },
  { key: 'Apple', value: 'apple' },
  { key: 'Strawberry', value: 'strawberry' },
  { key: 'Pineapple', value: 'pineapple' },
  { key: 'Dragon Fruit', value: 'dragon_fruit' },
  { key: 'Guava', value: 'guava' },
  { key: 'Mango', value: 'mango' },
  { key: 'Rambutan', value: 'rambutan' },
  { key: 'Star Fruit', value: 'star_fruit' },
  // ciku
  { key: 'Sapodilla', value: 'sapodilla' },
  { key: 'Durian', value: 'durian' },
];

const FruitForm = ({ isFruitImportAns }: IFruitProps) => (
  <>
    <FormikControl
      control="selectField"
      label="Fruit types"
      name="fruitList"
      options={fruitLists}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Did the product use any fertilizer?"
      name="fruitFertilizer"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Does the fruit imported ?"
      name="fruitImport"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
    {isFruitImportAns && isFruitImportAns === 'true' && (
      <FormikControl
        control="textField"
        label="What country does the fruit imported from ?"
        name="fruitCountryImport"
        type={FieldType.TEXT}
      />
    )}
    <FormikControl
      control="textField"
      label="Where does the fruit being planted ?"
      name="fruitPlant"
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Does the fruit used any pesticides ?"
      name="fruitPesticide"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Does the fruit used any wax?"
      name="fruitWax"
      options={trueOrFalseQuestion}
      type={FieldType.TEXT}
    />
  </>
);

export {
  ChickenFieldForm,
  MeatFieldForm,
  SeafoodFieldForm,
  VegetableForm,
  FruitForm,
};
