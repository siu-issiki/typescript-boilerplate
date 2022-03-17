import { TestUtils } from '__tests__/supports/test_utils';

const testUtils = new TestUtils();
jest.setTimeout(30000);

beforeAll(async () => {});

afterAll(async () => {});

beforeEach(async () => {
  jest.clearAllMocks();
  await testUtils.cleanAll().catch();
});

afterEach(async () => {
  await testUtils.cleanAll().catch();
});
