import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme,
} from '@mui/material';

const App = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const theme = useTheme();

  const steps = [
    'Informações Pessoais',
    'Documentação',
    'Viagem',
    'Contatos',
    'Família',
    'Ocupação'
  ];

  const watchOtherNames = watch('otherNames', 'Não');
  const watchOtherCitizenship = watch('otherCitizenship', 'Não');
  const watchLostPassport = watch('lostPassport', 'Não');
  const watchTravelPayment = watch('travelPayment', 'Eu mesmo');
  const watchPreviousVisit = watch('previousVisit', 'Não');
  const watchVisaDenied = watch('visaDenied', 'Não');
  const watchPreviousVisa = watch('previousVisa', 'Não');
  const watchRelativesInUS = watch('relativesInUS', 'Não');

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Enviar dados para o servidor
      const response = await axios.post('http://localhost:3000/api/submit-form', data);
      
      console.log('Dados enviados com sucesso:', response.data);
      setSubmitted(true);
      setSnackbar({
        open: true,
        message: 'Formulário enviado com sucesso! Os dados foram salvos no banco.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao enviar o formulário. Por favor, tente novamente.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Sobrenome (Last Name)"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome (First Name)"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome completo conforme o passaporte"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Você já usou outros nomes (incluindo nome de solteiro, apelidos, etc.)?</FormLabel>
                <Controller
                  name="otherNames"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="previousNames"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    disabled={watchOtherNames !== 'Sim'}
                    label="Se sim, liste todos os nomes anteriores"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="birthDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de nascimento (DD/MM/AAAA)"
                    error={!!errors.birthDate}
                    helperText={errors.birthDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="birthPlace"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Local de nascimento (Cidade, Estado, País)"
                    error={!!errors.birthPlace}
                    helperText={errors.birthPlace?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="citizenship"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="País de cidadania"
                    error={!!errors.citizenship}
                    helperText={errors.citizenship?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Você tem outra cidadania?</FormLabel>
                <Controller
                  name="otherCitizenship"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="otherCitizenshipCountry"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    disabled={watchOtherCitizenship !== 'Sim'}
                    label="Se sim, informe o país"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Rua, Número"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Cidade"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="state"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Estado/Província"
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="zipCode"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="CEP"
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="País"
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="primaryPhone"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Número de telefone primário"
                    error={!!errors.primaryPhone}
                    helperText={errors.primaryPhone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="secondaryPhone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Número de telefone secundário"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ 
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Endereço de e-mail inválido"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Endereço de e-mail"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="passportNumber"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Número do passaporte"
                    error={!!errors.passportNumber}
                    helperText={errors.passportNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="passportCountry"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="País emissor do passaporte"
                    error={!!errors.passportCountry}
                    helperText={errors.passportCountry?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="passportIssuePlace"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Cidade e local onde o passaporte foi emitido"
                    error={!!errors.passportIssuePlace}
                    helperText={errors.passportIssuePlace?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="passportIssueDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de emissão (DD/MM/AAAA)"
                    error={!!errors.passportIssueDate}
                    helperText={errors.passportIssueDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="passportExpiryDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de expiração (DD/MM/AAAA)"
                    error={!!errors.passportExpiryDate}
                    helperText={errors.passportExpiryDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Você já perdeu um passaporte ou teve um passaporte roubado?</FormLabel>
                <Controller
                  name="lostPassport"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="lostPassportDetails"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={watchLostPassport !== 'Sim'}
                    label="Se sim, forneça detalhes"
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="travelPurpose"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Objetivo da viagem"
                    error={!!errors.travelPurpose}
                    helperText={errors.travelPurpose?.message}
                  >
                    <MenuItem value="Turismo">Turismo</MenuItem>
                    <MenuItem value="Negócios">Negócios</MenuItem>
                    <MenuItem value="Estudos">Estudos</MenuItem>
                    <MenuItem value="Trabalho">Trabalho</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="arrivalDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data prevista de chegada aos EUA (DD/MM/AAAA)"
                    error={!!errors.arrivalDate}
                    helperText={errors.arrivalDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="stayDuration"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Duração da estadia nos EUA"
                    error={!!errors.stayDuration}
                    helperText={errors.stayDuration?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="cityToVisit"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Cidade que pretende visitar"
                    error={!!errors.cityToVisit}
                    helperText={errors.cityToVisit?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Quem está pagando pela sua viagem?</FormLabel>
                <Controller
                  name="travelPayment"
                  control={control}
                  defaultValue="Eu mesmo"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Eu mesmo" control={<Radio />} label="Eu mesmo" />
                      <FormControlLabel value="Outra pessoa" control={<Radio />} label="Outra pessoa" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="paymentPersonDetails"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={watchTravelPayment !== 'Outra pessoa'}
                    label="Se outra pessoa, forneça nome, endereço e telefone"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Você já esteve nos EUA antes?</FormLabel>
                <Controller
                  name="previousVisit"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="previousVisitDetails"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={watchPreviousVisit !== 'Sim'}
                    label="Se sim, informe todas as visitas anteriores (datas e duração da estadia)"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Já teve visto americano negado ou revogado?</FormLabel>
                <Controller
                  name="visaDenied"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="visaDeniedDetails"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={watchVisaDenied !== 'Sim'}
                    label="Se sim, informe detalhes"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Você já teve um visto dos EUA emitido?</FormLabel>
                <Controller
                  name="previousVisa"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="previousVisaDetails"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    disabled={watchPreviousVisa !== 'Sim'}
                    label="Se sim, informe o número do visto e a data de emissão"
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="contactName"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome da pessoa ou organização de contato nos EUA"
                    error={!!errors.contactName}
                    helperText={errors.contactName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="contactRelationship"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Relação com o contato"
                    error={!!errors.contactRelationship}
                    helperText={errors.contactRelationship?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="contactAddress"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Endereço do contato"
                    error={!!errors.contactAddress}
                    helperText={errors.contactAddress?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="contactPhone"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Telefone do contato"
                    error={!!errors.contactPhone}
                    helperText={errors.contactPhone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="contactEmail"
                control={control}
                defaultValue=""
                rules={{ 
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Endereço de e-mail inválido"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="E-mail do contato"
                    error={!!errors.contactEmail}
                    helperText={errors.contactEmail?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="fatherName"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome completo do pai"
                    error={!!errors.fatherName}
                    helperText={errors.fatherName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="fatherBirthDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de nascimento do pai (DD/MM/AAAA)"
                    error={!!errors.fatherBirthDate}
                    helperText={errors.fatherBirthDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">O pai está nos EUA?</FormLabel>
                <Controller
                  name="fatherInUS"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="motherName"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome completo da mãe"
                    error={!!errors.motherName}
                    helperText={errors.motherName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="motherBirthDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de nascimento da mãe (DD/MM/AAAA)"
                    error={!!errors.motherBirthDate}
                    helperText={errors.motherBirthDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">A mãe está nos EUA?</FormLabel>
                <Controller
                  name="motherInUS"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Você tem algum parente imediato nos EUA?</FormLabel>
                <Controller
                  name="relativesInUS"
                  control={control}
                  defaultValue="Não"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="relativesInUSDetails"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={watchRelativesInUS !== 'Sim'}
                    label="Se sim, informe nome, relação e status nos EUA"
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 5:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="currentOccupation"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Sua ocupação atual"
                    error={!!errors.currentOccupation}
                    helperText={errors.currentOccupation?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="companyName"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome da empresa ou instituição de ensino"
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="companyAddress"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Endereço da empresa ou instituição"
                    error={!!errors.companyAddress}
                    helperText={errors.companyAddress?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="companyPhone"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Telefone da empresa ou instituição"
                    error={!!errors.companyPhone}
                    helperText={errors.companyPhone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="jobTitle"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Seu cargo atual"
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="jobStartDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de início no emprego atual (DD/MM/AAAA)"
                    error={!!errors.jobStartDate}
                    helperText={errors.jobStartDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="jobDescription"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label="Descrição do trabalho atual"
                    error={!!errors.jobDescription}
                    helperText={errors.jobDescription?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="previousJobs"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Empregos anteriores nos últimos 5 anos"
                    helperText="Nome da empresa, cargo(s), data de entrada, data de saída, nome do supervisor, telefone, endereço"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="lastSchool"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Última instituição de ensino frequentada que concluiu"
                    error={!!errors.lastSchool}
                    helperText={errors.lastSchool?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="schoolAddress"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Endereço do local"
                    error={!!errors.schoolAddress}
                    helperText={errors.schoolAddress?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="schoolPhone"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Telefone do local"
                    error={!!errors.schoolPhone}
                    helperText={errors.schoolPhone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="course"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Curso"
                    error={!!errors.course}
                    helperText={errors.course?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="courseStartDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de início"
                    error={!!errors.courseStartDate}
                    helperText={errors.courseStartDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="courseEndDate"
                control={control}
                defaultValue=""
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data de término"
                    error={!!errors.courseEndDate}
                    helperText={errors.courseEndDate?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Etapa Desconhecida';
    }
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)',
      minHeight: '100vh', 
      py: 4 
    }}>
      <Container maxWidth="md" sx={{ mb: 5 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 2,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(90deg, #FF6B00 0%, #FF8A33 100%)',
              borderTopLeftRadius: theme.shape.borderRadius,
              borderTopRightRadius: theme.shape.borderRadius
            }
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom
              sx={{ 
                color: theme.palette.primary.dark,
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '25%',
                  width: '50%',
                  height: '4px',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '2px'
                }
              }}
            >
              FORMULÁRIO | DESTINO VISTO
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mt: 3 }}>
              Preencha todas as informações com atenção e verifique antes de enviar.
            </Typography>
            <Typography variant="subtitle2" align="center" color="text.secondary" gutterBottom>
              Obs.: Caso não saiba alguma informação, preencha com "NULO".
            </Typography>
            <Divider sx={{ my: 3, borderColor: 'rgba(255, 107, 0, 0.2)' }} />
          </Box>

          {submitted ? (
            <Box sx={{ mt: 4, mb: 2 }}>
              <Alert severity="success" sx={{ backgroundColor: 'rgba(237, 247, 237, 0.9)' }}>
                Formulário enviado com sucesso! Obrigado por preencher todas as informações.
                <br />
                Os dados foram salvos no banco de dados e já podem ser utilizados pelo sistema de automação.
              </Alert>
            </Box>
          ) : (
            <Box>
              <Stepper 
                activeStep={activeStep} 
                alternativeLabel 
                sx={{ 
                  mb: 5,
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: theme.palette.primary.main,
                  },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box 
                sx={{ 
                  p: 3, 
                  border: '1px solid rgba(255, 107, 0, 0.2)',
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  mb: 3
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  {getStepContent(activeStep)}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                      disabled={activeStep === 0 || loading}
                      onClick={handleBack}
                      variant="outlined"
                      sx={{ 
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.dark,
                          backgroundColor: 'rgba(255, 107, 0, 0.04)',
                        }
                      }}
                    >
                      Voltar
                    </Button>
                    <Box>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={loading}
                          sx={{ 
                            px: 4,
                            background: 'linear-gradient(45deg, #FF6B00 30%, #FF8A33 90%)'
                          }}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar'}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          sx={{ 
                            px: 4,
                            background: 'linear-gradient(45deg, #FF6B00 30%, #FF8A33 90%)'
                          }}
                        >
                          Próximo
                        </Button>
                      )}
                    </Box>
                  </Box>
                </form>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App; 