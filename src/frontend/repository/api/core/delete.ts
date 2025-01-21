interface Props<Input> {
  identifier: string;
  id: Input;
}

/**
 * Reusable repository function that serve data deletion purpose.
 * @param identifier as module's name
 * @param id as module's data id
 */
async function deleteAPI<Input, Output>({ identifier, id }: Props<Input>) {
  const reponse: Output = await fetch(`/api/${identifier}/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());

  return reponse;
}

export default deleteAPI;
