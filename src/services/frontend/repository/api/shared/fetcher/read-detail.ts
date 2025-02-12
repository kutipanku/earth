interface Props {
  identifier: string;
  id: string;
}

/**
 * Reusable repository function that serve data read purpose for detail.
 * @param identifier as module's name
 * @param body as module's payload
 */
async function readDetailData<Output>({ identifier, id }: Props) {
  return fetch(`/api/${identifier}/${id}`).then((res) => res.json() as Output);
}

export default readDetailData;
