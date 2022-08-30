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
      label="What type of meat ?"
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

const seafoodTypes: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Fish', value: 'fish' },
  { key: 'Mollusca', value: 'Mollusca' },
  { key: 'Crustacea', value: 'crustacea' },
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
          label="List of fish"
          name="fishType"
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
  </>
);

export { ChickenFieldForm, MeatFieldForm, SeafoodFieldForm };
