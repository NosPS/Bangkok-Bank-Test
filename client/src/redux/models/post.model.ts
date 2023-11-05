type Props = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

class PostModel {
  id: number;
  userId: number;
  title: string;
  body: string;

  constructor(props: Props) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.body = props.body;
  }
}

export default PostModel;
