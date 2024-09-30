import React from 'react'
import { Page, Text, Image, Document, StyleSheet, View, Link } from "@react-pdf/renderer"

interface PDFFileProps {
  story: any
}

const styles = StyleSheet.create({
  heading_1: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 5,
  },
  heading_2: {
    fontSize: 16,
    fontWeight: 800,
    marginBottom: 5,
  },
  heading_3: {
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 20,
    textAlign: 'justify',
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  }
});

const renderContentBlock = (block) => {
  switch (block.type) {
    case 'heading':
      return (
        <Text key={block.id} style={block.props.level === 1 ? styles.heading_1 : block.props.level === 2 ? styles.heading_2 : styles.heading_3}>
          {block.content.map(contentBlock => contentBlock.text)}
        </Text>
      );

    case 'paragraph':
      return (
        <View>
          {block.content[0]?.type == 'link' ? (
            <Link src={block.content[0].href}>{block.content[0].href}</Link>
          ) : (
          <Text key={block.id} style={styles.paragraph}>
            {block.content.length > 0 ? block.content.map(contentBlock => contentBlock.text) : " "}
          </Text>)}
        </View>
      );

    case 'numberedListItem':
      return (
        <Text>
          {'\u2022 ' + block.content[0].text}
        </Text>
      );
    
    case 'bulletListItem':
      return (
        <Text>
          {'\u2022 ' + block.content[0].text}
        </Text>
      );
    
    case 'table':
      return (
        <View key={block.id} style={{ marginVertical: 10 }}>
          {block.content.rows.map((row, rowIdx) => (
            <View key={rowIdx} style={{ flexDirection: 'row', marginBottom: 5 }}>
              {row.cells.map((cell, cellIdx) => (
                <Text key={cellIdx} style={{ border: '1px solid black', padding: 5 }}>
                  {cell.text}
                </Text>
              ))}
            </View>
          ))}
        </View>
      );

    case 'image':
      return (
        <View>
          <Image src={block.props.url} />
        </View>
      );
      
    default:
      return null;
  }
};

const renderContent = (blocks) => blocks.map(block => renderContentBlock(block));

const PDFFile = ({ story }: PDFFileProps) => {
  return (
    <Document author={story?.story?.author.name || story?.author.name || ""} creationDate={new Date()} creator={story?.story?.author.name || story?.author.name || ""}>
      <Page style={{ padding: 30, fontSize: 12 }}>
        <Image src={story.cover}/>
        {story.chapters ? (story.chapters.map(chapter => renderContent(chapter.blocks))) : (renderContent(story.blocks))}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  )
}

export default PDFFile;