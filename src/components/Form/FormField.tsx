import React from 'react';
import XLSX from 'xlsx';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  CssBaseline,
  TextField,
  Typography,
  Container,
  Button,
} from '@material-ui/core';

import useStyles from './styles';
import styles from './FormField.module.css'
import { IFormValueType, IFileType } from '../Interfaces';

const EXTENSIONS = ['xlsx', 'xls', 'csv']

const FormField: React.FC = (props) => {
  const classes = useStyles();

  // =======import excel=========
  const getExention = (file: IFileType) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }
  const importExcel = (e: React.ChangeEvent<HTMLInputElement>, callback: Function) => {
    const file = (e.target as any).files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      //parse data
      const binaryStr = (e.target as any).result
      const workBook = XLSX.read(binaryStr, { type: "binary" })
      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData: Array<string> | any = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      //for render data
      const [titlesArray, ...restDataArray] = fileData
      const data = titlesArray.slice(0, 5).map((title: string, idx: number) => ({
        [title]: restDataArray[0][idx], selected: ""
      })
      )
      callback("data", data)
    }
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      } else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    }
  }
  // =======================================================
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Transition modal
        </Typography>
        <Formik
          initialValues ={{
            firstName: "",
            lastName: "",
            data: [],
          }}
          enableReinitialize
          onSubmit={(values: IFormValueType) => console.log("Person", values)
          }
        >
          {(props) => {
            const {
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <TextField
                  name="firstName"
                  label="name"
                  type="text"
                  placeholder="Enter your name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                >
                </ TextField>
                <TextField
                  name="lastName"
                  type="text"
                  label="Surname"
                  placeholder="Enter your surname"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                >
                </ TextField>
                {/* === Choose file ===== */}
                <label
                  className={styles.lableInput}
                  htmlFor="file"
                > Choose file
                </label>
                {/* <div id="custom-text">No file chosen, yet.</div> */}
                <Field
                  className={styles.fileInput}
                  id="file"
                  name="file"
                  type="file"
                  hidden
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    importExcel(event, setFieldValue)
                  }}
                />
                {/* ======Table with data from excel */}
                <div className={styles.tableBlock}>
                  <Typography component="h4" variant="h5">
                    Your Document:
                  </Typography>

                  <FieldArray name="file">
                    {() => (
                      <div>
                        {!!values.data.length &&
                          values.data.slice(0, 5).map((titles, index) => {
                            return (
                              <div key={index}>
                                <div className={styles.arrayBlock}>
                                  <div className={styles.labelBlock}>
                                    <label className={styles.labelItem} >
                                      <b>{Object.keys(titles)[0]}</b>
                                    </label>
                                  </div>
                                  <div className={styles.dataField}  >
                                    <span>{Object.values(titles)[0]} </span>
                                  </div>
                                  <div className={styles.selectBlock}>
                                    <Field
                                      className={styles.selectButton}
                                      component="select"
                                      name={`data.${index}.${"selected"}`}
                                    >
                                      <option value="" label="data type" />
                                      <option value="integer" label="integer" />
                                      <option value="string" label="string" />
                                      <option value="data" label="data" />
                                      <option value="float" label="float" />
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className={styles.tableButton}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  > Confirm
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    color="secondary"
                  > Reset
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default FormField;