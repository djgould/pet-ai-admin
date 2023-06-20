import { useCallback } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Edit,
  DateField,
  DateInput,
  EditButton,
  ReferenceManyField,
  required,
  SimpleForm,
  TextInput,
  Button,
  ListButton,
  ShowButton,
  TopToolbar,
  useEditContext,
} from "react-admin";
import { useClient } from "./context/client";

export const OrdersList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
      <TextField source="status" />
      <TextField source="replicateTrainingStatus" />
      <TextField source="userId" />
    </Datagrid>
  </List>
);

const OrderEditActions = () => {
  const client = useClient();
  const { record: order, isLoading } = useEditContext();
  const restartTraining = useCallback(() => {
    client.post(`/orders/${order.id}/restart`);
  }, [client, order]);

  const restartInference = useCallback(() => {
    client.post(`/orders/${order.id}/restart-inference`);
  }, [client, order]);

  return (
    <TopToolbar>
      <ShowButton />
      {/* Add your custom actions */}
      <ListButton />
      <Button color="primary" onClick={restartTraining}>
        Restart Training
      </Button>
      <Button color="primary" onClick={restartInference}>
        Restart Inference
      </Button>
    </TopToolbar>
  );
};

export const OrderEdit = () => (
  <Edit actions={<OrderEditActions />}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="createdAt" />
      <TextInput source="updatedAt" />
      <TextInput source="status" />
      <TextInput source="replicateTrainingStatus" />
      <TextInput source="userId" />
    </SimpleForm>
  </Edit>
);
