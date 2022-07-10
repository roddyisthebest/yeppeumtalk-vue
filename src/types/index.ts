// contentImageUri: "http://www.yeppeumtalk.com/api/v1/common/images/f70436a5-fa4b-4c47-8e22-03eface8f374"
// createdAt: "2022-07-08T16:42:06"
// idx: 26
// slideImageUri: "http://www.yeppeumtalk.com/api/v1/common/images/472af12d-d52a-4e94-82a9-98c20059c683"
// squareImageUri: "http://www.yeppeumtalk.com/api/v1/common/images/e4ac2669-8697-448b-a8f9-81baa853fee9"
// title: "test"
// code: 200
// data: {contents: Array(6), total_page: 1, current_page: 0}
// message: "event list"

type response = {
  code: number;
  data: {
    contents: event[] | [];
    total_page: number;
    current_page: number;
  };
  message: string;
};

type event = {
  contentImageUri: string;
  createdAt: Date;
  idx: number;
  slideImageUri: string;
  squareImageUri: string;
  title: string;
};

type user = {
  name: string | null;
  accessToken: string | null;
};

type page = {
  userEvent: number | null;
  adminEvent: number | null;
  user: number | null;
};

export { response, event, user, page };
