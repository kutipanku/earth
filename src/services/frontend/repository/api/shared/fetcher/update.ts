interface Props<Input> {
  identifier: string;
  id: string;
  body: Input;
}

/**
 * Reusable repository function that serve data update purpose.
 * @param identifier as module's name
 * @param body as module's data id
 * @param body as module's payload
 */
async function updateData<Input, Output>({
  identifier,
  id,
  body,
}: Props<Input>) {
  const response: Output = await fetch(`/api/${identifier}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return response;
}

export default updateData;
