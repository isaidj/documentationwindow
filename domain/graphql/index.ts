import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Agrupacion = {
  __typename?: 'Agrupacion';
  defecto: Scalars['Boolean']['output'];
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  orden: Scalars['Int']['output'];
  tipo: Scalars['String']['output'];
  uso?: Maybe<Scalars['String']['output']>;
  vigeciaId?: Maybe<Scalars['Int']['output']>;
};

export enum AttachmentType {
  Base64 = 'Base64',
  Url = 'Url'
}

export type AuthAddYearAndEntityByJwtInput = {
  entidad: Scalars['Int']['input'];
  vigencia: Scalars['Int']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  entity?: Maybe<Entity>;
  token: Scalars['String']['output'];
  user: User;
  userPermission?: Maybe<UserPermission>;
};

export type CdpModel = {
  __typename?: 'CdpModel';
  codigo: Scalars['Int']['output'];
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  id_solicitud?: Maybe<Scalars['String']['output']>;
  saldo: Scalars['String']['output'];
  valor_comprometido: Scalars['String']['output'];
  valor_inicial: Scalars['String']['output'];
  valor_liberado: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type ComparativoPresupuestalAppModel = {
  __typename?: 'ComparativoPresupuestalAppModel';
  afectaciones_gasto: Scalars['String']['output'];
  afectaciones_ingreso: Scalars['String']['output'];
  presupuesto_final_gasto: Scalars['String']['output'];
  presupuesto_final_ingreso: Scalars['String']['output'];
  presupuesto_inicial_gasto: Scalars['String']['output'];
  presupuesto_inicial_ingreso: Scalars['String']['output'];
};

export type ComparativoPresupuestalDetGtoModel = {
  __typename?: 'ComparativoPresupuestalDetGtoModel';
  adiciones: Scalars['String']['output'];
  id_fuente: Scalars['Int']['output'];
  id_vigencia: Scalars['Int']['output'];
  presupuesto_inicial: Scalars['String']['output'];
  recortes: Scalars['String']['output'];
  translado_asta: Scalars['String']['output'];
  translado_desde: Scalars['String']['output'];
  translados: Scalars['String']['output'];
};

export type ComparativoPresupuestalDetIngModel = {
  __typename?: 'ComparativoPresupuestalDetIngModel';
  adiciones: Scalars['String']['output'];
  id_fuente: Scalars['Int']['output'];
  id_vigencia: Scalars['Int']['output'];
  presupuesto_inicial: Scalars['String']['output'];
  recortes: Scalars['String']['output'];
};

export type ComparativoPresupuestalModel = {
  __typename?: 'ComparativoPresupuestalModel';
  diferencia: Scalars['String']['output'];
  fuente_descripcion: Scalars['String']['output'];
  id_entidad: Scalars['Int']['output'];
  id_fuente: Scalars['Int']['output'];
  id_vigencia: Scalars['Int']['output'];
  presupuesto_adicion: Scalars['String']['output'];
  presupuesto_definitivo_gasto: Scalars['String']['output'];
  presupuesto_definitivo_ingreso: Scalars['String']['output'];
  presupuesto_inicial: Scalars['String']['output'];
  presupuesto_recorte: Scalars['String']['output'];
  presupuesto_traslado_contracredito: Scalars['String']['output'];
  presupuesto_traslado_credito: Scalars['String']['output'];
};

export type CreateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  pushId?: InputMaybe<Scalars['String']['input']>;
  secondField: Scalars['DateTime']['input'];
  thirdField: Scalars['Float']['input'];
};

export type CreateHelpInput = {
  description: Scalars['String']['input'];
  outlineId: Scalars['String']['input'];
  state: StateHelp;
  url: Scalars['String']['input'];
};

export type CreateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']['input']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']['input']>;
  hasEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasPersistent?: InputMaybe<Scalars['Boolean']['input']>;
  hasPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasSubscription?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']['input']>;
  hasWss?: InputMaybe<Scalars['Boolean']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profileId: Scalars['ID']['input'];
  pushCode?: InputMaybe<Scalars['String']['input']>;
  smsBody?: InputMaybe<Scalars['String']['input']>;
  subtype: Scalars['String']['input'];
  type: NotificationType;
  wssCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notificationConfigId: Scalars['ID']['input'];
};

export type CreateNotificationInput = {
  emailAttachments?: InputMaybe<Array<EmailAttachment>>;
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  hasPersistent?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  notificationGroupId?: InputMaybe<Scalars['ID']['input']>;
  pushRecipient?: InputMaybe<PushRecipient>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig: Scalars['String']['input'];
  type: TypeNotification;
  typeConfig: NotificationType;
  userId?: InputMaybe<Scalars['Int']['input']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type CreateProfileInput = {
  city: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  document: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  region: Scalars['Int']['input'];
};

export type CuadreBancarioDiarioMovilModel = {
  __typename?: 'CuadreBancarioDiarioMovilModel';
  anterior_cuadre?: Maybe<Scalars['String']['output']>;
  anterior_saldo_final_exacto: Scalars['String']['output'];
  cargado?: Maybe<Scalars['String']['output']>;
  credito: Scalars['String']['output'];
  credito_exacto: Scalars['String']['output'];
  cuenta_descripcion: Scalars['String']['output'];
  cuenta_id: Scalars['String']['output'];
  debito: Scalars['String']['output'];
  debito_exacto: Scalars['String']['output'];
  diferencia_saldo_libro: Scalars['String']['output'];
  pucCod: Scalars['String']['output'];
  saldo_final: Scalars['String']['output'];
  saldo_final_exacto: Scalars['String']['output'];
  saldo_inicial: Scalars['String']['output'];
  saldo_inicial_exacto: Scalars['String']['output'];
  ultimo_cuadre?: Maybe<Scalars['String']['output']>;
};

export type CuentasxPagarModel = {
  __typename?: 'CuentasxPagarModel';
  PptTip?: Maybe<Scalars['String']['output']>;
  apropiacionDefinitiva: Scalars['String']['output'];
  desagregado?: Maybe<Scalars['String']['output']>;
  liquidado?: Maybe<Scalars['String']['output']>;
  pagado: Scalars['String']['output'];
  presupuestoCategoria?: Maybe<Scalars['String']['output']>;
  presupuestoCodigo: Scalars['String']['output'];
  presupuestoConsecutivo: Scalars['String']['output'];
  presupuestoDescripcion: Scalars['String']['output'];
  presupuestoInicial: Scalars['String']['output'];
  presupuestoNivel?: Maybe<Scalars['String']['output']>;
  presupuestoNumeroNivel: Scalars['Int']['output'];
  saldoPagar: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type DateFilter = {
  _between?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _eq?: InputMaybe<Scalars['DateTime']['input']>;
  _gt?: InputMaybe<Scalars['DateTime']['input']>;
  _gte?: InputMaybe<Scalars['DateTime']['input']>;
  _in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _lt?: InputMaybe<Scalars['DateTime']['input']>;
  _lte?: InputMaybe<Scalars['DateTime']['input']>;
  _neq?: InputMaybe<Scalars['DateTime']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DetalleInput = {
  PresupuestoCodigo: Scalars['String']['input'];
  codigoTercero?: InputMaybe<Scalars['String']['input']>;
  documentsBudgetaryType?: InputMaybe<DocumentsBudgetaryType>;
  estado?: InputMaybe<Scalars['String']['input']>;
  fecha: Scalars['String']['input'];
  itemSearch?: InputMaybe<Scalars['String']['input']>;
};

export enum DocumentsBudgetaryType {
  Cdp = 'cdp',
  Cxp = 'cxp',
  Egr = 'egr',
  Op = 'op',
  Opr = 'opr',
  Rp = 'rp',
  Rsv = 'rsv'
}

export type Dummy = {
  __typename?: 'Dummy';
  email?: Maybe<Scalars['String']['output']>;
  firstField: Scalars['String']['output'];
  group?: Maybe<DummyGroup>;
  items: Array<DummyItem>;
  phone?: Maybe<Scalars['String']['output']>;
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  type?: Maybe<DummyType>;
};

export type DummyFamily = {
  __typename?: 'DummyFamily';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type DummyGroup = {
  __typename?: 'DummyGroup';
  family?: Maybe<DummyFamily>;
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type DummyItem = {
  __typename?: 'DummyItem';
  dummy: Dummy;
  firstField: Scalars['String']['output'];
  fourthField: Scalars['Int']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
};

export type DummyType = {
  __typename?: 'DummyType';
  name: Scalars['String']['output'];
};

export type DummyView = {
  __typename?: 'DummyView';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
};

export type DummyViewOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type DummyViewWhere = {
  _and?: InputMaybe<Array<DummyViewWhere>>;
  _or?: InputMaybe<Array<DummyViewWhere>>;
  id?: InputMaybe<StringFilter>;
};

export type EgresoCuentasXpagarModel = {
  __typename?: 'EgresoCuentasXpagarModel';
  bruto?: Maybe<Scalars['String']['output']>;
  codigo: Scalars['Int']['output'];
  codigo_op?: Maybe<Scalars['String']['output']>;
  cuenta?: Maybe<Scalars['String']['output']>;
  cuenta_bancaria?: Maybe<Scalars['String']['output']>;
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  medio_pago?: Maybe<Scalars['String']['output']>;
  neto?: Maybe<Scalars['String']['output']>;
  nit: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  retenido?: Maybe<Scalars['String']['output']>;
  vigencia: Scalars['Int']['output'];
};

export type EgresoModel = {
  __typename?: 'EgresoModel';
  bruto?: Maybe<Scalars['String']['output']>;
  codigo: Scalars['Int']['output'];
  cuenta?: Maybe<Scalars['String']['output']>;
  cuenta_bancaria?: Maybe<Scalars['String']['output']>;
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  medio_pago?: Maybe<Scalars['String']['output']>;
  neto?: Maybe<Scalars['String']['output']>;
  nit: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  retenido?: Maybe<Scalars['String']['output']>;
  vigencia: Scalars['Int']['output'];
};

export type EgresoReservaModel = {
  __typename?: 'EgresoReservaModel';
  bruto?: Maybe<Scalars['String']['output']>;
  codigo: Scalars['Int']['output'];
  codigo_op?: Maybe<Scalars['String']['output']>;
  cuenta?: Maybe<Scalars['String']['output']>;
  cuenta_bancaria?: Maybe<Scalars['String']['output']>;
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  medio_pago?: Maybe<Scalars['String']['output']>;
  neto?: Maybe<Scalars['String']['output']>;
  nit: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  retenido?: Maybe<Scalars['String']['output']>;
  vigencia: Scalars['Int']['output'];
};

export type EmailAditionalInfo = {
  id?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type EmailAttachment = {
  base64?: InputMaybe<Scalars['String']['input']>;
  extension: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: AttachmentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type EmailRecipient = {
  aditionalInfo?: InputMaybe<EmailAditionalInfo>;
  email: Scalars['String']['input'];
  type: RecipientType;
};

export type Entity = {
  __typename?: 'Entity';
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type FilterDto = {
  cacheQuery?: InputMaybe<Scalars['String']['input']>;
  filt?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  groupBy?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  route?: InputMaybe<Scalars['String']['input']>;
  selectGroup?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

export type FindDummyFamilyWhere = {
  _and?: InputMaybe<Array<FindDummyFamilyWhere>>;
  _or?: InputMaybe<Array<FindDummyFamilyWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyGroupWhere = {
  _and?: InputMaybe<Array<FindDummyGroupWhere>>;
  _or?: InputMaybe<Array<FindDummyGroupWhere>>;
  family?: InputMaybe<FindDummyFamilyWhere>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyOrderBy = {
  firstField?: InputMaybe<OrderTypes>;
  secondField?: InputMaybe<OrderTypes>;
  thirdField?: InputMaybe<OrderTypes>;
};

export type FindDummyTypeWhere = {
  _and?: InputMaybe<Array<FindDummyTypeWhere>>;
  _or?: InputMaybe<Array<FindDummyTypeWhere>>;
  name?: InputMaybe<StringFilter>;
};

export type FindDummyWhere = {
  _and?: InputMaybe<Array<FindDummyWhere>>;
  _or?: InputMaybe<Array<FindDummyWhere>>;
  firstField?: InputMaybe<StringFilter>;
  group?: InputMaybe<FindDummyGroupWhere>;
  secondField?: InputMaybe<DateFilter>;
  thirdField?: InputMaybe<NumberFilter>;
  type?: InputMaybe<FindDummyTypeWhere>;
};

export type GastoInput = {
  fecha: Scalars['String']['input'];
  fuenteCodigo?: InputMaybe<Scalars['Float']['input']>;
  itemSearch?: InputMaybe<Scalars['String']['input']>;
};

export type GastoModel = {
  __typename?: 'GastoModel';
  PptTip?: Maybe<Scalars['String']['output']>;
  apropiacionDefinitiva: Scalars['String']['output'];
  cdp: Scalars['String']['output'];
  compromisos: Scalars['String']['output'];
  ordenado: Scalars['String']['output'];
  pagado: Scalars['String']['output'];
  presupuestoCategoria: Scalars['String']['output'];
  presupuestoCodigo: Scalars['String']['output'];
  presupuestoConsecutivo: Scalars['String']['output'];
  presupuestoDescripcion: Scalars['String']['output'];
  presupuestoInicial: Scalars['String']['output'];
  presupuestoNivel?: Maybe<Scalars['String']['output']>;
  presupuestoNumeroNivel: Scalars['Int']['output'];
  vigencia: Scalars['Int']['output'];
};

export type Help = {
  __typename?: 'Help';
  createDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  outlineId: Scalars['String']['output'];
  state: StateHelp;
  url: Scalars['String']['output'];
};

export type MetadataPagination = {
  __typename?: 'MetadataPagination';
  currentPage?: Maybe<Scalars['Int']['output']>;
  itemsPerPage?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type MovimientoCreditoLibroModel = {
  __typename?: 'MovimientoCreditoLibroModel';
  codigo: Scalars['String']['output'];
  codigo_tercero: Scalars['String']['output'];
  credito: Scalars['String']['output'];
  descripcion: Scalars['String']['output'];
  descripcion_detalle: Scalars['String']['output'];
  fecha: Scalars['DateTime']['output'];
  tercero: Scalars['String']['output'];
  tipo: Scalars['String']['output'];
  tipo_abreviatura: Scalars['String']['output'];
  tipo_comprovante: Scalars['String']['output'];
};

export type MovimientoDebitoLibroModel = {
  __typename?: 'MovimientoDebitoLibroModel';
  codigo: Scalars['String']['output'];
  codigo_tercero: Scalars['String']['output'];
  debito: Scalars['String']['output'];
  descripcion: Scalars['String']['output'];
  descripcion_detalle: Scalars['String']['output'];
  fecha: Scalars['DateTime']['output'];
  tercero: Scalars['String']['output'];
  tipo: Scalars['String']['output'];
  tipo_abreviatura: Scalars['String']['output'];
  tipo_comprovante: Scalars['String']['output'];
};

export type MovimientoExtractoCreditoModel = {
  __typename?: 'MovimientoExtractoCreditoModel';
  cheque: Scalars['String']['output'];
  codigo: Scalars['String']['output'];
  credito: Scalars['String']['output'];
  debito: Scalars['String']['output'];
  descripcion_transaccion: Scalars['String']['output'];
  efectivo: Scalars['String']['output'];
  fecha: Scalars['DateTime']['output'];
  numero_documento: Scalars['Int']['output'];
  oficina: Scalars['String']['output'];
  oficina_nombre: Scalars['String']['output'];
  total: Scalars['String']['output'];
};

export type MovimientoExtractoDebitoModel = {
  __typename?: 'MovimientoExtractoDebitoModel';
  cheque: Scalars['String']['output'];
  codigo: Scalars['String']['output'];
  credito: Scalars['String']['output'];
  debito: Scalars['String']['output'];
  descripcion_transaccion: Scalars['String']['output'];
  efectivo: Scalars['String']['output'];
  fecha: Scalars['DateTime']['output'];
  numero_documento: Scalars['String']['output'];
  oficina: Scalars['String']['output'];
  oficina_nombre: Scalars['String']['output'];
  total: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  aceptarProgramacionPagos: ResponseStatusMessageModel;
  clearCacheKeyGastos: Scalars['String']['output'];
  createDummiesX: Array<Dummy>;
  createDummy: Dummy;
  createHelp: Help;
  createNotification: Notification;
  createNotificationConfig: NotificationConfig;
  createNotificationGroup: NotificationGroup;
  createProfile: Profile;
  recoverPassword: ResponseStatusMessageModel;
  removeDummy: Dummy;
  removeNotification: Notification;
  removeNotificationConfig: NotificationConfig;
  removeProfile: Profile;
  signIn: AuthResponse;
  signInByUserKey: AuthResponse;
  updateDummy: Dummy;
  updateHelp: Help;
  updateNotification: Notification;
  updateNotificationConfig: NotificationConfig;
  updateNotificationHaPersistent: Notification;
  updateProfile: Profile;
  validatePasswordRecoveryToken: ResponseStatusMessageModel;
};


export type MutationAceptarProgramacionPagosArgs = {
  pagarObligacionesInput: PagarObligacionesInput;
};


export type MutationClearCacheKeyGastosArgs = {
  arg: GastoInput;
};


export type MutationCreateDummyArgs = {
  createInput: CreateDummyInput;
};


export type MutationCreateHelpArgs = {
  createInput: CreateHelpInput;
};


export type MutationCreateNotificationArgs = {
  createInput: CreateNotificationInput;
};


export type MutationCreateNotificationConfigArgs = {
  createInput: CreateNotificationConfigInput;
};


export type MutationCreateNotificationGroupArgs = {
  createInput: CreateNotificationGroupInput;
};


export type MutationCreateProfileArgs = {
  createInput: CreateProfileInput;
};


export type MutationRecoverPasswordArgs = {
  recoverPasswordInput: RecoverPasswordInput;
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveNotificationConfigArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  signinInput: SigninInput;
};


export type MutationSignInByUserKeyArgs = {
  usarApiKey: Scalars['String']['input'];
};


export type MutationUpdateDummyArgs = {
  updateInput: UpdateDummyInput;
};


export type MutationUpdateHelpArgs = {
  updateInput: UpdateHelpInput;
};


export type MutationUpdateNotificationArgs = {
  updateInput: UpdateNotificationInput;
};


export type MutationUpdateNotificationConfigArgs = {
  updateInput: UpdateNotificationConfigInput;
};


export type MutationUpdateNotificationHaPersistentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateProfileArgs = {
  updateInput: UpdateProfileInput;
};


export type MutationValidatePasswordRecoveryTokenArgs = {
  validatePasswordRecoveryInput: PasswordRecoveryTokenInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  externalId?: Maybe<Scalars['ID']['output']>;
  externalMessage?: Maybe<Scalars['String']['output']>;
  hasPersistent: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  notificationConfig: NotificationConfig;
  notificationGroup?: Maybe<NotificationGroup>;
  persistentExpiration?: Maybe<Scalars['DateTime']['output']>;
  persistentHtml?: Maybe<Scalars['String']['output']>;
  pushAction?: Maybe<Scalars['String']['output']>;
  pushBody?: Maybe<Scalars['String']['output']>;
  pushScreen?: Maybe<Scalars['String']['output']>;
  pushTitle?: Maybe<Scalars['String']['output']>;
  stateNotification: StateNotification;
  statePersistent?: Maybe<StatePersistent>;
  type: TypeNotification;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type NotificationConfig = {
  __typename?: 'NotificationConfig';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  emailDuplicateCode?: Maybe<Scalars['ID']['output']>;
  emailPrincipalCode?: Maybe<Scalars['ID']['output']>;
  hasEmail: Scalars['Boolean']['output'];
  hasPersistent: Scalars['Boolean']['output'];
  hasPush: Scalars['Boolean']['output'];
  hasSms: Scalars['Boolean']['output'];
  hasSubscription: Scalars['Boolean']['output'];
  hasTwoStepsEmail: Scalars['Boolean']['output'];
  hasTwoStepsPush: Scalars['Boolean']['output'];
  hasTwoStepsSms: Scalars['Boolean']['output'];
  hasTwoStepsWss: Scalars['Boolean']['output'];
  hasWss: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  index: Scalars['Float']['output'];
  key?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  persistentExpiration?: Maybe<Scalars['DateTime']['output']>;
  persistentHtml?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  pushCode?: Maybe<Scalars['ID']['output']>;
  smsBody?: Maybe<Scalars['String']['output']>;
  subtype: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  wssCode?: Maybe<Scalars['ID']['output']>;
};

export type NotificationGroup = {
  __typename?: 'NotificationGroup';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  notificationConfig: NotificationConfig;
  stateNotificationGroup: StateNotificationGroup;
  typeNotificationGroup: TypeNotificationGroup;
  updatedAt: Scalars['DateTime']['output'];
};

export enum NotificationType {
  General = 'General',
  Token = 'Token',
  Dispersion = 'dispersion'
}

export type NumberFilter = {
  _between?: InputMaybe<Array<Scalars['Float']['input']>>;
  _eq?: InputMaybe<Scalars['Float']['input']>;
  _gt?: InputMaybe<Scalars['Float']['input']>;
  _gte?: InputMaybe<Scalars['Float']['input']>;
  _in?: InputMaybe<Array<Scalars['Float']['input']>>;
  _lt?: InputMaybe<Scalars['Float']['input']>;
  _lte?: InputMaybe<Scalars['Float']['input']>;
  _neq?: InputMaybe<Scalars['Float']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type OpModel = {
  __typename?: 'OpModel';
  codigo: Scalars['Int']['output'];
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  id_registro: Scalars['String']['output'];
  neto?: Maybe<Scalars['String']['output']>;
  nit: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  retenido: Scalars['String']['output'];
  saldo: Scalars['String']['output'];
  valor_inicial: Scalars['String']['output'];
  valor_pagado: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type OprModel = {
  __typename?: 'OprModel';
  codigo: Scalars['Int']['output'];
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  id_registro: Scalars['String']['output'];
  nit: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  retenido: Scalars['String']['output'];
  saldo: Scalars['String']['output'];
  valor_inicial: Scalars['String']['output'];
  valor_pagado: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type OrdenPagoReservaModel = {
  __typename?: 'OrdenPagoReservaModel';
  PptTip?: Maybe<Scalars['String']['output']>;
  apropiacionDefinitiva: Scalars['String']['output'];
  ordenado: Scalars['String']['output'];
  pagado: Scalars['String']['output'];
  presupuestoCategoria: Scalars['String']['output'];
  presupuestoCodigo: Scalars['String']['output'];
  presupuestoConsecutivo: Scalars['String']['output'];
  presupuestoDescripcion: Scalars['String']['output'];
  presupuestoInicial: Scalars['String']['output'];
  presupuestoNivel?: Maybe<Scalars['String']['output']>;
  presupuestoNumeroNivel: Scalars['Int']['output'];
  saldoPagar: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export enum OrderTypes {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PagarObligacionesInput = {
  anoCod: Scalars['Int']['input'];
  codigosDetallesAceptados?: InputMaybe<Array<Scalars['Int']['input']>>;
  egresoCodigo: Scalars['Int']['input'];
  pagarObligacionesRechazarInput?: InputMaybe<Array<PagarObligacionesRecharInput>>;
  username: Scalars['String']['input'];
};

export type PagarObligacionesRecharInput = {
  codigoDetallesRechazado?: InputMaybe<Scalars['Int']['input']>;
  motivoRechazo?: InputMaybe<Scalars['String']['input']>;
};

export type Pagination = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Parameter = {
  __typename?: 'Parameter';
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ParameterInput = {
  code: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type PasswordRecoveryTokenInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
};

export type PresupuestoIngresoModel = {
  __typename?: 'PresupuestoIngresoModel';
  PptTip?: Maybe<Scalars['String']['output']>;
  apropiacionDefinitiva: Scalars['String']['output'];
  fuenteCodigo: Scalars['String']['output'];
  fuenteDescripcion: Scalars['String']['output'];
  presupuestoCategoria: Scalars['String']['output'];
  presupuestoCodigo: Scalars['String']['output'];
  presupuestoConsecutivo: Scalars['String']['output'];
  presupuestoDescripcion: Scalars['String']['output'];
  presupuestoInicial: Scalars['String']['output'];
  presupuestoNivel?: Maybe<Scalars['String']['output']>;
  presupuestoNumeroNivel: Scalars['Int']['output'];
  recaudo: Scalars['String']['output'];
  saldoXrecaudar: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  city: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  document: Scalars['String']['output'];
  email: Scalars['String']['output'];
  externalId: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  notificationConfigs: Array<NotificationConfig>;
  phone?: Maybe<Scalars['String']['output']>;
  region: Scalars['Int']['output'];
  stateAws?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type ProgramacionPagosInput = {
  anoCod: Scalars['Int']['input'];
  estado?: InputMaybe<Scalars['String']['input']>;
  fechaFin: Scalars['String']['input'];
  fechaInico: Scalars['String']['input'];
};

export type ProgramacionPagosModel = {
  __typename?: 'ProgramacionPagosModel';
  bancoCodigo: Scalars['String']['output'];
  bancoNombre: Scalars['String']['output'];
  egresoCodigo: Scalars['String']['output'];
  egresoDescripcion: Scalars['String']['output'];
  egresoFecha: Scalars['DateTime']['output'];
  estado?: Maybe<Scalars['String']['output']>;
  fechaEjecucion?: Maybe<Scalars['DateTime']['output']>;
  numerosObligacion: Scalars['Float']['output'];
  usuarioAutoriza?: Maybe<Scalars['String']['output']>;
  usuarioEjecuta?: Maybe<Scalars['String']['output']>;
  usuarioElabora?: Maybe<Scalars['String']['output']>;
  usuarioRechaza?: Maybe<Scalars['String']['output']>;
  valorAceptado: Scalars['String']['output'];
  valorGirado: Scalars['String']['output'];
  valorNeto: Scalars['String']['output'];
  valorProgramado: Scalars['String']['output'];
  valorRechazado: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type ProgramacionPagosObligacionDetalleInput = {
  anoCod: Scalars['Int']['input'];
  egresoCodigo: Scalars['String']['input'];
  egresoCuentaDetalle: Scalars['String']['input'];
  terceroCodigo: Scalars['String']['input'];
  terceroCuenta: Scalars['String']['input'];
};

export type ProgramacionPagosObligacionDetalleModel = {
  __typename?: 'ProgramacionPagosObligacionDetalleModel';
  DctGuid?: Maybe<Scalars['String']['output']>;
  EgrDetVlr?: Maybe<Scalars['String']['output']>;
  FechaEgreso?: Maybe<Scalars['DateTime']['output']>;
  bancoNombre?: Maybe<Scalars['String']['output']>;
  codigoEgresoVisual?: Maybe<Scalars['String']['output']>;
  cuentaDescripcion?: Maybe<Scalars['String']['output']>;
  cuentaDetalleCodigo?: Maybe<Scalars['String']['output']>;
  cuentaTipo?: Maybe<Scalars['String']['output']>;
  egresoCodigo?: Maybe<Scalars['Int']['output']>;
  egresoCodigoInterno?: Maybe<Scalars['String']['output']>;
  egresoDetalleCodigo?: Maybe<Scalars['Int']['output']>;
  egresoId?: Maybe<Scalars['String']['output']>;
  estado?: Maybe<Scalars['String']['output']>;
  fechaGestion?: Maybe<Scalars['DateTime']['output']>;
  motivoRechazo?: Maybe<Scalars['String']['output']>;
  obligacionCodigo: Scalars['String']['output'];
  obligacionDescripcion?: Maybe<Scalars['String']['output']>;
  obligacionId?: Maybe<Scalars['String']['output']>;
  obligacionTipo: Scalars['String']['output'];
  obligacionValor?: Maybe<Scalars['String']['output']>;
  terceroCodigo?: Maybe<Scalars['String']['output']>;
  terceroCuenta?: Maybe<Scalars['String']['output']>;
  terceroNombre: Scalars['String']['output'];
  terceroResponsable?: Maybe<Scalars['String']['output']>;
  totalDeducion?: Maybe<Scalars['String']['output']>;
  usuarioAprueba?: Maybe<Scalars['String']['output']>;
  usuarioElabora?: Maybe<Scalars['String']['output']>;
  usuarioRechaza?: Maybe<Scalars['String']['output']>;
  valorDetalle?: Maybe<Scalars['String']['output']>;
  valorGirado?: Maybe<Scalars['String']['output']>;
  valorNeto?: Maybe<Scalars['String']['output']>;
  valorPagado?: Maybe<Scalars['String']['output']>;
  valorSaldo?: Maybe<Scalars['String']['output']>;
  vigencia: Scalars['Int']['output'];
};

export type ProgramacionPagosObligacionesInput = {
  anoCod: Scalars['Int']['input'];
  egresoCodigo: Scalars['String']['input'];
};

export type ProgramacionPagosObligacionesModel = {
  __typename?: 'ProgramacionPagosObligacionesModel';
  OblOrgCod?: Maybe<Scalars['String']['output']>;
  OblOrgCod2?: Maybe<Scalars['String']['output']>;
  PreEgrDetOrd?: Maybe<Scalars['String']['output']>;
  SaldoObligacion?: Maybe<Scalars['String']['output']>;
  bancoNombre: Scalars['String']['output'];
  conceptoCodigo?: Maybe<Scalars['String']['output']>;
  cuentaDescripcion: Scalars['String']['output'];
  egresoClase?: Maybe<Scalars['String']['output']>;
  egresoCodigo: Scalars['String']['output'];
  egresoCodigoInterno?: Maybe<Scalars['String']['output']>;
  egresoCodigoVisual?: Maybe<Scalars['String']['output']>;
  egresoCuentaDetalle?: Maybe<Scalars['String']['output']>;
  egresoId?: Maybe<Scalars['String']['output']>;
  estado: Scalars['String']['output'];
  itemDetalle?: Maybe<Scalars['String']['output']>;
  terceroCodigo?: Maybe<Scalars['String']['output']>;
  terceroCuenta?: Maybe<Scalars['String']['output']>;
  terceroDispercion?: Maybe<Scalars['String']['output']>;
  terceroNombre: Scalars['String']['output'];
  terceroTipoCuenta: Scalars['String']['output'];
  totalObligaciones?: Maybe<Scalars['String']['output']>;
  valorAprobado?: Maybe<Scalars['String']['output']>;
  valorBruto?: Maybe<Scalars['String']['output']>;
  valorGirado?: Maybe<Scalars['String']['output']>;
  valorNeto?: Maybe<Scalars['Float']['output']>;
  valorPagoObligacion?: Maybe<Scalars['String']['output']>;
  valorRechazado?: Maybe<Scalars['String']['output']>;
  valorSaldo?: Maybe<Scalars['String']['output']>;
  valorTotalDeducion?: Maybe<Scalars['String']['output']>;
  vigencia: Scalars['Int']['output'];
  visualRubro?: Maybe<Scalars['String']['output']>;
};

export type ProyectoDetalleInput = {
  fecha: Scalars['String']['input'];
  proyectoId?: InputMaybe<Scalars['String']['input']>;
};

export type PushRecipient = {
  document?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pushId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  NotificationGroup: NotificationGroup;
  NotificationGroups: Array<NotificationGroup>;
  NotificationGroupsCount: MetadataPagination;
  agrupacion: Array<Agrupacion>;
  agrupacionByUso: Array<Agrupacion>;
  authAddYearEntityByJwt: ResponseAuthTokenSwit;
  authGetEntityAndYear: ResponseAuthGetEntityAndYear;
  /** @deprecated NO PUEDO MAS */
  authTokenSwit: ResponseAuthTokenSwit;
  comparativoPresupuestal: Array<ComparativoPresupuestalModel>;
  comparativoPresupuestalApp: Array<ComparativoPresupuestalAppModel>;
  comparativoPresupuestalDetGto: Array<ComparativoPresupuestalDetGtoModel>;
  comparativoPresupuestalDetIng: Array<ComparativoPresupuestalDetIngModel>;
  cuadreBancoDiario: Array<CuadreBancarioDiarioMovilModel>;
  documentStatusConfig: StatusModel;
  dummies: Array<Dummy>;
  dummiesCount: MetadataPagination;
  dummy: Dummy;
  dummyView: Array<DummyView>;
  findAllCdp: Array<CdpModel>;
  findAllCuentasPorPagarHome: Array<ResponseCuentasxPagarModel>;
  findAllCuentasXpagar: Array<CxpModel>;
  findAllDocumentoReserva: Array<RsvModel>;
  findAllEgrCuentasxPagar: Array<EgresoCuentasXpagarModel>;
  findAllEgrReserva: Array<EgresoReservaModel>;
  findAllEgreso: Array<EgresoModel>;
  findAllFuenteIngresos: Array<PresupuestoIngresoModel>;
  findAllGasto: Array<ResponseGastoModel>;
  findAllNotificationsByUser: Array<Notification>;
  findAllOp: Array<OpModel>;
  findAllOpReserva: Array<OprModel>;
  findAllOpReservaHome: Array<ResponseOrdenPagoReservaModel>;
  findAllPresupuestoIngresoHome: Array<ResponsePresupuestoIngresoModel>;
  findAllRecaudos: Array<RecaudosModel>;
  findAllRecaudosConcepto: Array<RecaudosConceptoModel>;
  findAllRp: Array<RpModel>;
  findAllTercero: Array<Tercero>;
  findOneProyectoDetails: ResponseProyectoDetailModel;
  getCertimailsTemplates: Array<TemplateExternalResponse>;
  getParameter: Parameter;
  help: Help;
  helps: Array<Help>;
  helpsCount: MetadataPagination;
  movimientoCreditoLibro: Array<MovimientoCreditoLibroModel>;
  movimientoDebitoLibro: Array<MovimientoDebitoLibroModel>;
  movimientoExtractoCredito: Array<MovimientoExtractoCreditoModel>;
  movimientoExtractoDebito: Array<MovimientoExtractoDebitoModel>;
  nofiticationConfigsByProfile: Array<NotificationConfig>;
  notification: Notification;
  notificationConfig: NotificationConfig;
  notificationConfigs: Array<NotificationConfig>;
  notificationConfigsCount: MetadataPagination;
  notificationSubTypes: Array<Scalars['String']['output']>;
  notifications: Array<Notification>;
  notificationsCount: MetadataPagination;
  profile: Profile;
  profiles: Array<Profile>;
  profilesCount: MetadataPagination;
  programacionPagos: Array<ProgramacionPagosModel>;
  programacionPagosObligaciones: Array<ProgramacionPagosObligacionesModel>;
  programacionPagosObligacionesDetalle: Array<ProgramacionPagosObligacionDetalleModel>;
  searchDocumentsAll: Array<ResponseDocumentsModel>;
  searchGastoAll: Array<GastoModel>;
  templatePush: TemplatePushExternalResponse;
  verifyJwt: AuthResponse;
};


export type QueryNotificationGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAgrupacionByUsoArgs = {
  uso: Scalars['String']['input'];
};


export type QueryAuthAddYearEntityByJwtArgs = {
  arg: AuthAddYearAndEntityByJwtInput;
};


export type QueryAuthTokenSwitArgs = {
  token: Scalars['String']['input'];
};


export type QueryComparativoPresupuestalArgs = {
  agrupacionId: Scalars['Int']['input'];
  fuente: Scalars['Int']['input'];
  mesFin: Scalars['Int']['input'];
  mesInicio: Scalars['Int']['input'];
  vigencia: Scalars['Int']['input'];
};


export type QueryComparativoPresupuestalAppArgs = {
  agrupacionId: Scalars['Int']['input'];
  mesFin: Scalars['Int']['input'];
  mesInicio: Scalars['Int']['input'];
  vigencia: Scalars['Int']['input'];
};


export type QueryComparativoPresupuestalDetGtoArgs = {
  agrupacionId: Scalars['Int']['input'];
  fuente: Scalars['Int']['input'];
  mesFin: Scalars['Int']['input'];
  mesInicio: Scalars['Int']['input'];
  vigencia: Scalars['Int']['input'];
};


export type QueryComparativoPresupuestalDetIngArgs = {
  agrupacionId: Scalars['Int']['input'];
  fuente: Scalars['Int']['input'];
  mesFin: Scalars['Int']['input'];
  mesInicio: Scalars['Int']['input'];
  vigencia: Scalars['Int']['input'];
};


export type QueryCuadreBancoDiarioArgs = {
  entidadId: Scalars['Int']['input'];
  mesFin: Scalars['DateTime']['input'];
  mesInicio: Scalars['DateTime']['input'];
  vigencia: Scalars['Int']['input'];
};


export type QueryDummiesArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummiesCountArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDummyViewArgs = {
  orderBy?: InputMaybe<Array<DummyViewOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<DummyViewWhere>;
};


export type QueryFindAllCdpArgs = {
  arg: DetalleInput;
};


export type QueryFindAllCuentasPorPagarHomeArgs = {
  arg: GastoInput;
};


export type QueryFindAllCuentasXpagarArgs = {
  arg: DetalleInput;
};


export type QueryFindAllDocumentoReservaArgs = {
  arg: DetalleInput;
};


export type QueryFindAllEgrCuentasxPagarArgs = {
  arg: DetalleInput;
};


export type QueryFindAllEgrReservaArgs = {
  arg: DetalleInput;
};


export type QueryFindAllEgresoArgs = {
  arg: DetalleInput;
};


export type QueryFindAllFuenteIngresosArgs = {
  arg: GastoInput;
};


export type QueryFindAllGastoArgs = {
  arg: GastoInput;
};


export type QueryFindAllOpArgs = {
  arg: DetalleInput;
};


export type QueryFindAllOpReservaArgs = {
  arg: DetalleInput;
};


export type QueryFindAllOpReservaHomeArgs = {
  arg: GastoInput;
};


export type QueryFindAllPresupuestoIngresoHomeArgs = {
  arg: GastoInput;
};


export type QueryFindAllRecaudosArgs = {
  arg: RecaudosInput;
};


export type QueryFindAllRecaudosConceptoArgs = {
  arg: RecaudosConceptoInput;
};


export type QueryFindAllRpArgs = {
  arg: DetalleInput;
};


export type QueryFindAllTerceroArgs = {
  arg: FilterDto;
};


export type QueryFindOneProyectoDetailsArgs = {
  arg: ProyectoDetalleInput;
};


export type QueryGetCertimailsTemplatesArgs = {
  templateExternal: TemplateExternal;
};


export type QueryGetParameterArgs = {
  input: ParameterInput;
};


export type QueryHelpArgs = {
  helpId: Scalars['Float']['input'];
};


export type QueryHelpsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryHelpsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMovimientoCreditoLibroArgs = {
  comprobante_id: Scalars['Int']['input'];
  mesFin: Scalars['DateTime']['input'];
  mesInicio: Scalars['DateTime']['input'];
  vigencia: Scalars['Int']['input'];
};


export type QueryMovimientoDebitoLibroArgs = {
  comprobante_id: Scalars['Int']['input'];
  mesFin: Scalars['DateTime']['input'];
  mesInicio: Scalars['DateTime']['input'];
  vigencia: Scalars['Int']['input'];
};


export type QueryMovimientoExtractoCreditoArgs = {
  CuadreId: Scalars['String']['input'];
  mesFin: Scalars['DateTime']['input'];
  mesInicio: Scalars['DateTime']['input'];
};


export type QueryMovimientoExtractoDebitoArgs = {
  CuadreId: Scalars['String']['input'];
  mesFin: Scalars['DateTime']['input'];
  mesInicio: Scalars['DateTime']['input'];
};


export type QueryNofiticationConfigsByProfileArgs = {
  profileId: Scalars['ID']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationConfigArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationConfigsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationConfigsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationSubTypesArgs = {
  notificationType: NotificationType;
};


export type QueryNotificationsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProfilesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfilesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProgramacionPagosArgs = {
  programacionPagosInput: ProgramacionPagosInput;
};


export type QueryProgramacionPagosObligacionesArgs = {
  programacionPagosObligacionesModel: ProgramacionPagosObligacionesInput;
};


export type QueryProgramacionPagosObligacionesDetalleArgs = {
  programacionPagosObligacionDetalleInput: ProgramacionPagosObligacionDetalleInput;
};


export type QuerySearchDocumentsAllArgs = {
  arg: DetalleInput;
};


export type QuerySearchGastoAllArgs = {
  arg: GastoInput;
};


export type QueryTemplatePushArgs = {
  id: Scalars['ID']['input'];
  profileId: Scalars['ID']['input'];
};

export type RecaudosConceptoInput = {
  argCod?: InputMaybe<Scalars['String']['input']>;
  fecha: Scalars['String']['input'];
};

export type RecaudosConceptoModel = {
  __typename?: 'RecaudosConceptoModel';
  RecaCcpBrtVlr?: Maybe<Scalars['String']['output']>;
  RecaCcpDesVlr?: Maybe<Scalars['String']['output']>;
  RecaCcpNetVlr?: Maybe<Scalars['String']['output']>;
  agrupacionCodigo: Scalars['String']['output'];
  agrupacionDescripcion: Scalars['String']['output'];
  conceptoCodigo: Scalars['String']['output'];
  conceptoDescripcion: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type RecaudosInput = {
  CtaICod?: InputMaybe<Scalars['String']['input']>;
  codigoConcepto?: InputMaybe<Scalars['String']['input']>;
  estado?: InputMaybe<Scalars['String']['input']>;
  fecha: Scalars['String']['input'];
};

export type RecaudosModel = {
  __typename?: 'RecaudosModel';
  Fecha?: Maybe<Scalars['String']['output']>;
  RecaCcpBrtVlr?: Maybe<Scalars['String']['output']>;
  RecaCcpDesVlr?: Maybe<Scalars['String']['output']>;
  RecaCcpNetVlr?: Maybe<Scalars['String']['output']>;
  centroDescripcion?: Maybe<Scalars['String']['output']>;
  fechaReporte?: Maybe<Scalars['String']['output']>;
  recaudoCodigo: Scalars['Int']['output'];
  recaudoConsecutivo?: Maybe<Scalars['Float']['output']>;
  recaudoDescripcion?: Maybe<Scalars['String']['output']>;
  recaudoEstado?: Maybe<Scalars['String']['output']>;
  recaudoFecha?: Maybe<Scalars['String']['output']>;
  recaudoReferencia?: Maybe<Scalars['String']['output']>;
  terceroCodigo?: Maybe<Scalars['Float']['output']>;
  terceroDireccion?: Maybe<Scalars['String']['output']>;
  terceroNombre?: Maybe<Scalars['String']['output']>;
  terceroTelefono?: Maybe<Scalars['String']['output']>;
  vigencia: Scalars['Int']['output'];
};

export enum RecipientType {
  Bcc = 'Bcc',
  Cc = 'Cc',
  Destinatary = 'Destinatary'
}

export type RecoverPasswordInput = {
  email: Scalars['String']['input'];
};

export type ResponseAuthGetEntityAndYear = {
  __typename?: 'ResponseAuthGetEntityAndYear';
  ahno: Array<Scalars['Float']['output']>;
  entidades: Array<Entidad>;
};

export type ResponseAuthTokenSwit = {
  __typename?: 'ResponseAuthTokenSwit';
  accessToken: Scalars['String']['output'];
  entidad?: Maybe<Entidad>;
  error?: Maybe<Scalars['Boolean']['output']>;
  mensaje?: Maybe<Scalars['String']['output']>;
};

export type ResponseCuentasxPagarModel = {
  __typename?: 'ResponseCuentasxPagarModel';
  contenido: CuentasxPagarModel;
  items?: Maybe<Array<ResponseCuentasxPagarModel>>;
  nivel?: Maybe<Scalars['Int']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
};

export type ResponseDocumentsModel = CdpModel | EgresoModel | OpModel | OprModel | RpModel | CxpModel;

export type ResponseGastoModel = {
  __typename?: 'ResponseGastoModel';
  contenido: GastoModel;
  items?: Maybe<Array<ResponseGastoModel>>;
  nivel?: Maybe<Scalars['Int']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
};

export type ResponseOrdenPagoReservaModel = {
  __typename?: 'ResponseOrdenPagoReservaModel';
  contenido: OrdenPagoReservaModel;
  items?: Maybe<Array<ResponseOrdenPagoReservaModel>>;
  nivel?: Maybe<Scalars['Int']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
};

export type ResponsePresupuestoIngresoModel = {
  __typename?: 'ResponsePresupuestoIngresoModel';
  contenido: PresupuestoIngresoModel;
  items?: Maybe<Array<ResponsePresupuestoIngresoModel>>;
  nivel?: Maybe<Scalars['Int']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
};

export type ResponseProductoFuenteModel = {
  __typename?: 'ResponseProductoFuenteModel';
  FuenteDescripcion?: Maybe<Scalars['String']['output']>;
  anoCod?: Maybe<Scalars['String']['output']>;
  definitivo?: Maybe<Scalars['String']['output']>;
  fuenteId?: Maybe<Scalars['String']['output']>;
  productoId?: Maybe<Scalars['String']['output']>;
  proyectoDescripcionFx?: Maybe<Scalars['String']['output']>;
  proyectoId?: Maybe<Scalars['String']['output']>;
  saldo?: Maybe<Scalars['String']['output']>;
  valorCdp?: Maybe<Scalars['String']['output']>;
};

export type ResponseProyectoDetailModel = {
  __typename?: 'ResponseProyectoDetailModel';
  productoFuente?: Maybe<Array<ResponseProductoFuenteModel>>;
  proyectoDescripcion?: Maybe<Scalars['String']['output']>;
  proyectoFecha?: Maybe<Scalars['String']['output']>;
};

export type ResponseStatusMessageModel = {
  __typename?: 'ResponseStatusMessageModel';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type RpModel = {
  __typename?: 'RpModel';
  codigo: Scalars['Int']['output'];
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_certificado: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  nit: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  saldo: Scalars['String']['output'];
  valor_inicial: Scalars['String']['output'];
  valor_liquidado: Scalars['String']['output'];
  valor_ordenado: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type RsvModel = {
  __typename?: 'RsvModel';
  codigo: Scalars['Int']['output'];
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  nit: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  saldo: Scalars['String']['output'];
  valor_inicial: Scalars['String']['output'];
  valor_liquidado: Scalars['String']['output'];
  valor_ordenado: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type SigninInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SmsRecipient = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};

export enum StateHelp {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  PartialActive = 'PARTIAL_ACTIVE'
}

export enum StateNotification {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error'
}

export enum StateNotificationGroup {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error',
  PartialComplete = 'PartialComplete',
  Process = 'Process'
}

export enum StatePersistent {
  NoPersistent = 'NoPersistent',
  Open = 'Open',
  Receive = 'Receive',
  Send = 'Send'
}

export type StatusModel = {
  __typename?: 'StatusModel';
  cdp: Array<Scalars['String']['output']>;
  cxp: Array<Scalars['String']['output']>;
  egr: Array<Scalars['String']['output']>;
  op: Array<Scalars['String']['output']>;
  opr: Array<Scalars['String']['output']>;
  rec: Array<Scalars['String']['output']>;
  rp: Array<Scalars['String']['output']>;
};

export type StringFilter = {
  _contains?: InputMaybe<Scalars['String']['input']>;
  _endswith?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _notcontains?: InputMaybe<Scalars['String']['input']>;
  _notendswith?: InputMaybe<Scalars['String']['input']>;
  _notlike?: InputMaybe<Scalars['String']['input']>;
  _notstartswith?: InputMaybe<Scalars['String']['input']>;
  _startswith?: InputMaybe<Scalars['String']['input']>;
};

export type TemplateExternal = {
  profileId: Scalars['ID']['input'];
  subType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  typeSend: TemplateExternalType;
};

export type TemplateExternalResponse = {
  __typename?: 'TemplateExternalResponse';
  global?: Maybe<Scalars['Boolean']['output']>;
  guid: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum TemplateExternalType {
  Email = 'Email',
  Push = 'Push',
  Sms = 'Sms',
  Whatsapp = 'Whatsapp'
}

export type TemplatePushExternalResponse = {
  __typename?: 'TemplatePushExternalResponse';
  action?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['Boolean']['output']>;
  guid?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  screen?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Tercero = {
  __typename?: 'Tercero';
  TerCuin: Scalars['String']['output'];
  TerEmba: Scalars['Boolean']['output'];
  TerEstToken: Scalars['String']['output'];
  TerFecEla: Scalars['DateTime']['output'];
  TerFecFinToken: Scalars['DateTime']['output'];
  TerFecIniToken: Scalars['DateTime']['output'];
  TerFecUpd: Scalars['DateTime']['output'];
  TerHoraEla: Scalars['String']['output'];
  TerHoraUpd: Scalars['String']['output'];
  TerIdEntidad: Scalars['String']['output'];
  TerInvResp: Scalars['Boolean']['output'];
  TerIpEla: Scalars['String']['output'];
  TerIpUdp: Scalars['String']['output'];
  TerPoder: Scalars['Boolean']['output'];
  TerReciCod: Scalars['String']['output'];
  TerRespFacturar: Scalars['Boolean']['output'];
  TerSolVia: Scalars['Boolean']['output'];
  TerTokenAcc: Scalars['String']['output'];
  TerUsuEla: Scalars['String']['output'];
  TerUsuUdp: Scalars['String']['output'];
  tercero_: Scalars['Float']['output'];
  tercero_beneficiario: Scalars['Boolean']['output'];
  tercero_cargo_codigo: Scalars['Float']['output'];
  tercero_codigo_area: Scalars['Float']['output'];
  tercero_departamento_id: Scalars['Float']['output'];
  tercero_dirrecion: Scalars['String']['output'];
  tercero_dv: Scalars['Float']['output'];
  tercero_email: Scalars['String']['output'];
  tercero_estado: Scalars['String']['output'];
  tercero_funcionario: Scalars['Boolean']['output'];
  tercero_funcionario_paa: Scalars['Boolean']['output'];
  tercero_id: Scalars['Float']['output'];
  tercero_natureleza: Scalars['Float']['output'];
  tercero_nombre: Scalars['String']['output'];
  tercero_nuncicipio_id: Scalars['Float']['output'];
  tercero_ordenador: Scalars['Boolean']['output'];
  tercero_pais_id: Scalars['Float']['output'];
  tercero_primer_apellido: Scalars['String']['output'];
  tercero_primer_nombre: Scalars['String']['output'];
  tercero_regimen: Scalars['Float']['output'];
  tercero_segundo_apellido: Scalars['String']['output'];
  tercero_segundo_nombre: Scalars['String']['output'];
  tercero_solicitante: Scalars['Boolean']['output'];
  tercero_telefono: Scalars['String']['output'];
  tercero_tipo: Scalars['String']['output'];
  tercero_tipo_documento: Scalars['Float']['output'];
};

export enum TypeNotification {
  Email = 'Email',
  Push = 'Push',
  Sms = 'Sms',
  Wss = 'Wss'
}

export enum TypeNotificationGroup {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

export type UpdateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  pushId?: InputMaybe<Scalars['String']['input']>;
  secondField?: InputMaybe<Scalars['DateTime']['input']>;
  thirdField?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateHelpInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  outlineId?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<StateHelp>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']['input']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']['input']>;
  hasEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasPersistent?: InputMaybe<Scalars['Boolean']['input']>;
  hasPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasSubscription?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']['input']>;
  hasWss?: InputMaybe<Scalars['Boolean']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['ID']['input']>;
  pushCode?: InputMaybe<Scalars['String']['input']>;
  smsBody?: InputMaybe<Scalars['String']['input']>;
  subtype?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationType>;
  wssCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNotificationInput = {
  emailAttachments?: InputMaybe<Array<EmailAttachment>>;
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  hasPersistent?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  notificationGroupId?: InputMaybe<Scalars['ID']['input']>;
  pushRecipient?: InputMaybe<PushRecipient>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeNotification>;
  typeConfig?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type UpdateProfileInput = {
  city?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  agentIdentification?: Maybe<Scalars['Float']['output']>;
  crypt?: Maybe<Scalars['String']['output']>;
  cs3?: Maybe<Scalars['Boolean']['output']>;
  dispersion?: Maybe<Scalars['Boolean']['output']>;
  document?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  entity?: Maybe<Scalars['Float']['output']>;
  firstName: Scalars['String']['output'];
  firstTime?: Maybe<Scalars['Boolean']['output']>;
  guid?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  idPush?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  logDate?: Maybe<Scalars['DateTime']['output']>;
  logDateSuspension?: Maybe<Scalars['DateTime']['output']>;
  logExpirationDate?: Maybe<Scalars['DateTime']['output']>;
  logReason?: Maybe<Scalars['String']['output']>;
  logStatus?: Maybe<Scalars['String']['output']>;
  logTry?: Maybe<Scalars['Float']['output']>;
  logTryCicle?: Maybe<Scalars['Float']['output']>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  sac?: Maybe<Scalars['Boolean']['output']>;
  status: Scalars['Boolean']['output'];
  temporalPassword?: Maybe<Scalars['Boolean']['output']>;
  temporary?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  year?: Maybe<Scalars['Float']['output']>;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  /** Cuentas por pagar */
  accountsPayable?: Maybe<Scalars['Boolean']['output']>;
  /** Comparativo Presupuestal */
  budgetComparison?: Maybe<Scalars['Boolean']['output']>;
  /** Reservas Presupuestales */
  budgetReserves?: Maybe<Scalars['Boolean']['output']>;
  /** Cumplimiento Indicadores Ley 617 */
  complianceLaw617?: Maybe<Scalars['Boolean']['output']>;
  /** Consolidado por cuentas bancarias */
  consolidatedBankAccounts?: Maybe<Scalars['Boolean']['output']>;
  /** Consulta Detalladas del Sistema */
  detailSystemConsult?: Maybe<Scalars['Boolean']['output']>;
  /** Presupuesto de Gastos, Deuda e Inversion */
  expenseBudget?: Maybe<Scalars['Boolean']['output']>;
  /** Programacion de pago */
  paymentScheduling?: Maybe<Scalars['Boolean']['output']>;
  /** Presupuesto de Ingresos */
  revenueBudget?: Maybe<Scalars['Boolean']['output']>;
  /** Aplicativo SIIAFE mobile */
  siiafeMobile?: Maybe<Scalars['Boolean']['output']>;
};

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  phonePrefix?: InputMaybe<Scalars['String']['input']>;
};

export type CxpModel = {
  __typename?: 'cxpModel';
  codigo: Scalars['Int']['output'];
  descripcion: Scalars['String']['output'];
  estado: Scalars['String']['output'];
  fecha: Scalars['String']['output'];
  fecha_op?: Maybe<Scalars['String']['output']>;
  guid_documento?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  id_documento?: Maybe<Scalars['String']['output']>;
  id_op?: Maybe<Scalars['String']['output']>;
  nit: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  retenido: Scalars['String']['output'];
  saldo: Scalars['String']['output'];
  valor_inicial: Scalars['String']['output'];
  valor_pagado: Scalars['String']['output'];
  vigencia: Scalars['Int']['output'];
};

export type Entidad = {
  __typename?: 'entidad';
  entidadId: Scalars['String']['output'];
  entidadNombre: Scalars['String']['output'];
};

export type HelpsQueryVariables = Exact<{ [key: string]: never; }>;


export type HelpsQuery = { __typename?: 'Query', helps: Array<{ __typename?: 'Help', id: number, url: string, outlineId: string }> };


export const HelpsDocument = gql`
    query Helps {
  helps {
    id
    url
    outlineId
  }
}
    `;

/**
 * __useHelpsQuery__
 *
 * To run a query within a React component, call `useHelpsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelpsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelpsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelpsQuery(baseOptions?: Apollo.QueryHookOptions<HelpsQuery, HelpsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelpsQuery, HelpsQueryVariables>(HelpsDocument, options);
      }
export function useHelpsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelpsQuery, HelpsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelpsQuery, HelpsQueryVariables>(HelpsDocument, options);
        }
export function useHelpsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HelpsQuery, HelpsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HelpsQuery, HelpsQueryVariables>(HelpsDocument, options);
        }
export type HelpsQueryHookResult = ReturnType<typeof useHelpsQuery>;
export type HelpsLazyQueryHookResult = ReturnType<typeof useHelpsLazyQuery>;
export type HelpsSuspenseQueryHookResult = ReturnType<typeof useHelpsSuspenseQuery>;
export type HelpsQueryResult = Apollo.QueryResult<HelpsQuery, HelpsQueryVariables>;