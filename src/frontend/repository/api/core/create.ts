interface Props<Input> {
  identifier: string;
  body: Input;
}

/**
 * Reusable repository function that serve data creation purpose.
 * @param identifier as module's name
 * @param body as module's payload
 */
async function createAPI<Input, Output>({ identifier, body }: Props<Input>) {
  const response: Output = await fetch(`/api/${identifier}`, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return response;
}

export default createAPI;
