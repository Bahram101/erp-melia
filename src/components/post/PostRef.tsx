import { PostRefModel } from '../../models/CommonModels'

const PostRef = ({ post }: { post: PostRefModel | undefined }) => {
  if (!post) {
    return null
  }

  return <>
    { post.empName }
  </>
}

export default PostRef
