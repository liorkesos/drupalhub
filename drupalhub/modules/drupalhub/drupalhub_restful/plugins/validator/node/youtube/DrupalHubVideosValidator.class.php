<?php

/**
 * @file
 * Contains EntityValidatorExampleArticleValidator.
 */

class DrupalHubVideosValidator extends EntityValidateBase {

  /**
   * Overrides EntityValidateBase::getFieldsInfo().
   */
  public function publicFieldsInfo() {
    $fields = parent::publicFieldsInfo();

    $fields['field_address']['validators'][] = array($this, 'validateYouTubeAddress');

    return $fields;
  }

  /**
   * Validate that we don't have duplicate youtube files.
   */
  public function validateYouTubeAddress($field_name, $value) {
    $query = new EntityFieldQuery();
    $query
      ->entityCondition('entity_type', 'node')
      ->fieldCondition('field_address', 'video_url', $value['video_url']);

    $menu = menu_get_item();

    if (count($menu['map']) == 3) {
      // We are editing the video. Exclude the current nid.
      $query->propertyCondition('nid', $menu['map'][2], '<>');
    }

    $results = $query->execute();


    if (empty($results['node'])) {
      return;
    }

    $errors = array(
      'en' => 'There is already a video with this youtube address.',
      'he' => 'קיים כבר סרטון עם הכתובת הזאת.',
    );

    $lang = empty($_GET['lang']) ? 'en' : $_GET['lang'];

    $this->setError($field_name, $errors[$lang]);
  }
}
