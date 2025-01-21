interface Props<Input> {
  identifier: string;
  id: Input;
}

/**
 * Reusable repository function that serve data read purpose for detail.
 * @param identifier as module's name
 * @param body as module's payload
 */
async function readDetailAPI<Input, Output>({ identifier, id }: Props<Input>) {
  const response: Output = await fetch(`/api/${identifier}/${id}`).then((res) =>
    res.json()
  );

  return response;
}

export default readDetailAPI;
