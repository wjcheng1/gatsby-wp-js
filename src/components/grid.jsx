import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const GradientPlaceholder = () => (
	<div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-500" />
)
const withGrid = Component => {
	const GridedComponent = ({ data, ...props }) => {
		if (!data || !data.length) {
			return props.contentType ? (
				<h2 className="text-xl text-center mt-14">
					No {props.contentType} found 🏜
				</h2>
			) : null
		}

		return (
			<div className="mt-12 grid gap-5 max-w-content mx-auto lg:grid-cols-3 lg:max-w-screen-lg">
				{data.map((content, i) => {
					return <Component key={i} content={content} {...props} />
				})}
			</div>
		)
	}

	return GridedComponent
}

const GridItem = ({ href, imgSrc, altText, title }) => {
	return (
		<Link
			to={href}
			className="flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer border-2 h-full hover:border-indigo-500"
		>
			<div className="flex-shrink-0 relative h-40">
				{imgSrc ? (
					<GatsbyImage
						image={imgSrc}
						className="h-full w-full"
						objectFit="fit"
						alt={altText}
					/>
				) : (
					<GradientPlaceholder />
				)}
			</div>
			<h2 className="my-4 mx-6 text-xl leading-7 font-semibold text-gray-900">
				{title} &rarr;
			</h2>
		</Link>
	)
}

const PostGridItem = ({ content: { post } }) => {
	const imgSrc =
		post?.featuredImage?.node.localFile.childImageSharp.gatsbyImageData || null
	const altText = post?.featuredImage?.node.altText || post.title

	return (
		<GridItem
			href={`/posts${post.uri}`}
			imgSrc={imgSrc}
			altText={altText}
			title={post.title}
		/>
	)
}

const PageGridItem = ({ content: { page } }) => {
	const imgSrc =
		page?.featuredImage?.node.localFile.childImageSharp.gatsbyImageData || null
	const altText = page?.featuredImage?.node.altText || page.title

	return (
		<GridItem
			href={`/pages${page.uri}`}
			imgSrc={imgSrc}
			altText={altText}
			title={page.title}
		/>
	)
}

export const PostGrid = withGrid(PostGridItem)
export const PageGrid = withGrid(PageGridItem)
