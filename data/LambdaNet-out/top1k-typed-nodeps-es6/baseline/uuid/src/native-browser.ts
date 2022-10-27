const randomUUID: Object =
  typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);

export default { randomUUID };
