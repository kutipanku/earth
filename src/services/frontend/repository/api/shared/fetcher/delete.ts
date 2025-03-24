interface Props {
  identifier: string;
  id: string;
}

/**
 * Reusable repository function that serve data deletion purpose.
 * @param identifier as module's name
 * @param id as module's data id
 */
async function deleteData<Output>({ identifier, id }: Props) {
  return fetch(`/api/${identifier}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((res) => res.json() as Output);
}

export default deleteData;
